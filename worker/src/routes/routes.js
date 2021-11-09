const express = require('express');
const router = express.Router();
const Redis = require('redis');

const redisCli = Redis.createClient(process.env.REDIS_URL);

router.get('/operacion', (req, res) => {
    let entrada = req.query.entrada;
    let resultado = calcular(entrada);
    //Recibes valores y variables
    //const entrada = req.query.nombre1;

    const return_json = {
        entrada  : entrada,
        resultado : resultado
    };

    setHistorial(`historial`, `${entrada}=${resultado}`).then((data) => {
        console.log('Se pudo registrar');
        res.status(201).json(return_json);
    }).catch((error) => {
        console.log('error al registrar un historial: ' + error);
        res.status(201).json(return_json);
    });

});

router.get('/obtenerhistorial', (req, res) => {
    //Recibes valores y variables
    //const entrada = req.query.nombre1;

    getHistorial(`historial`).then((data) => {
        //let datosJSON = JSON.parse(data);
        console.log('Se pudo obtener: '+ data);
        res.status(201).json({data});
    }).catch((error) => {
        console.log('error al mostrar un historial: ' + error);
        res.status(201).json({});
    });

});

function calcular(expression){
	expression = expression.replace(/\^/g, "**");

	let x = Function('return ' + expression)();
	return x;
}


async function getHistorial(key){
    return new Promise((resolve, reject) => {
        redisCli.lrange(key, 0, -1, async (error, data) => {
            if(error) return reject(error);//rechazamos por error
            if(data != null){//existe la informacion   
                resolve(data);
            }
            reject(error);           
        });

    })
}

async function setHistorial(key, value){
    return new Promise((resolve, reject) => {
        redisCli.lpush(key, value, async (error, data) => {
            if(error) return reject(error);//rechazamos por error
            //if(data != null){//existe la informacion   
                resolve("true");
            //}
           
        });

    })
}

module.exports = router;

