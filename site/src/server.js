var express = require('express');
var app = express();
var path = require('path');
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

app.get('/app', (req, res) => {
   res.status(201).render('about');
});


//agregamos el 404
app.use((req, res, next) => {
   res.status(404).sendFile(path.join(__dirname, '../views/404.html'));
});

/*app.get('/', (req, res) => {
   res.status(201).sendFile( __dirname, '../views/index.html' );
})*/

var server = app.listen(8080, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Server corriendo: ", host, port);
})