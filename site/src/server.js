var express = require('express');
var app = express();
var path = require('path');
const jwb = require('jsonwebtoken');
/*
app.get('/', function (req, res) {
   res.send('Hello World');
})*/

//Agregamos rutas globales
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
//Set views
app.set('views', './views');
app.set('view engine', 'ejs');

//Agregamos los url de las paginas
app.get('/', (req, res) => {
   res.status(201).render('index');
});

app.get('/app', authUser, (req, res) => {
   res.status(201).render('about');
});

app.get('/login', (req, res) => {
   res.status(201).render('login');
});

app.get('/hist', authUser, (req, res) => {
   res.status(201).render('historial');
});


//agregamos el 404
app.use((req, res, next) => {
   //res.status(404).sendFile(path.join(__dirname, '../views/404.html'));
   res.status(201).render('404');
});

function authUser(req, res, next){
  /*    //Bearer TOKEN
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
   })*/

   next();
}

var server = app.listen(8080, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Server site corriendo: ", host, port);
})