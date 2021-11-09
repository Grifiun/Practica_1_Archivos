const express = require('express');
const axios = require('axios');
const Redis = require('redis');
const jwb = require('jsonwebtoken');
const { request } = require('express');
const router = express.Router();

const redisCli = Redis.createClient(process.env.REDIS_URL);

router.get('/servicios', authUser, (req, res) => {
    const entrada = req.query.entrada;
    //const result = calcular(entrada);
    //Se hace una llamada a la API worker
    
    console.log("Entrada: " + entrada);
   /* await axios.get('http://localhost:4000/worker/operacion', { entrada: entrada })
        .then(response => {
            console.log(response.data);

            res.status(201).json({
                entrada  : response.data.entrada,
                resultado : response.data.result
            });
        }).catch(error => {
            console.log(error);

            res.status(201).json({
                entrada  : entrada,
                resultado : "error al calcular"
            });
        });  */
        res.status(201).json({
            entrada  : entrada,
            resultado : "resultado"
        });
});
/*
async function getPromiseAjax(){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            dataType: "json",
            url: 'http://localhost:4000/worker/operacion',
            data: {entrada: entrada},
            success: function(data){
                res.status(201).json({
                    entrada  : data.entrada,
                    resultado : data.result
                });
            }
        });
    });        
}*/

router.get('/login', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    
    console.log("username: " + username);
    console.log("password: " + password);
    
    getCache(`usuario:${username}`, password).then((data) => {
        //Credenciales correctas
        
        const user = { username: username }
        const accessToken = jwb.sign(user, process.env.ACCES_TOKEN_SECRET);
        //request.header.token = accessToken;

        //res.json({accessToken: accessToken});        
        console.log({estado : data, accessToken: accessToken});
        res.status(201).json({accessToken: accessToken, estado : data});
        //res.status(201).json({estado : data});
    }).catch(() => {
        console.log({estado : false});
        res.status(201).json({estado : false});
    });
});

router.get('/register', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
 
    setCache(`usuario:${username}`, password).then((data) => {
        res.status(201).json({estado : data});
    }).catch(() => {
        res.status(201).json({estado : "se produjo un error"});
    });       
});

function authUser(req, res, next){
   
    //Bearer TOKEN
    console.log("inicio auth");
    const authHeader = req.headers.authorization;
    console.log("authorization: " + authHeader);
    const token = authHeader && authHeader.split(' ')[1];
 
    console.log("token: " + token);
    //si no hay token retorna error
    if(token == null) {
       console.log("Token nulo");
       return res.sendStatus(401);
    }
    //si tiene token verificamos dato
    jwb.verify(token, process.env.ACCES_TOKEN_SECRET, (error, user) => {
       if(error) {
          console.log("Token nulo");
          console.log(error);
          return res.sendStatus(403);//existe token pero hubo un error         
       }
       console.log("token valido");
       //req.user = user;
       next();
    })
 }

/*function calcular(expression){
	expression = expression.replace(/\^/g, "**");

	let x = Function('return ' + expression)();
	return x;
}*/


//Necesitamos una key y una funcion callback, que sera la resolucion

async function setCache(key, password){
    return new Promise((resolve, reject) => {
        redisCli.get(key, async (error, data) => {
            if(error) return reject(error);//rechazamos por error
            if(data != null){//existe la informacion   
                resolve("Ya existe un usuario con ese username");
            }
            redisCli.set(key, password);
            resolve("El usuario se registro de forma impecable");
        });
    })
}

async function getCache(key, password){
    return new Promise((resolve, reject) => {
        redisCli.get(key, async (error, data) => {
            if(error) return reject(error);//rechazamos por error
            if(data != null){//existe la informacion   
                if(data == password){           
                    resolve("true");
                }
            }
            resolve("false");
        });

    })
}

module.exports = router;