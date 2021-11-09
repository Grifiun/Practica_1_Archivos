const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

//Importamos carpeta public
app.use(express.static(__dirname + "/public"));

//Importamon json
app.use(express.json());

//Rutas
app.use('/', require('./routes/routes'));

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Error en la conexion con el server worker"
    })
});

app.listen(port, () => {
    console.log('servidor worker a su servicio en el puerto: ', port)
});