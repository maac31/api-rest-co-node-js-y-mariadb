const express = require('express');
const mysql = require('mysql2');
const myconn = require('express-myconnection');
const app = express();
const routes = require('./routes');

// agregamos las rutas
// conectamos con la base de datos
// cambias de puerto pero no  debes modificar nada mas, se hace automatico
app.set("port", process.env.PORT || 9000)
const dbOptions = {
    host: "localhost",
    port: 3308,
    user: "root",
    password: "1234",
    database: "library"
};

app.use(myconn(mysql, dbOptions, "single"));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hola api');
});

app.use('/api', routes);

// iniciamos el server
app.listen(app.get("port"), () => {   
    console.log("listening on")
})