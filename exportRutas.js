//const { query } = require("express");
const mysql = require("mysql");
const fs = require('fs');
const csvWriter = require("csv-write-stream");
const writer = csvWriter({headers: ['id_ruta', 'nombre', 'descripcion']});//cabeceras del archivo, comprobar nombres
const fileStream = fs.createWriteStream("G:/Mi unidad/Huertos-157755893/dataRoutes.csv")//directorio donde se guardara el archivo, comprobar ruta

const connection = mysql.createConnection({
    host:"localhost",//direccion IP del servidor    
    user: "root", //usuario
    password:"", //contraseña 
    database: "test" //nombre de la base de datos
});

connection.connect((err) =>{
    if (err) throw err;
    console.log("Conectado a la base datos");
})

connection.query("SELECT * FROM  rutas", (err, results) => {//consulta SQL, sera proporcionanda por jaime
    if (err) throw err;
    console.log("datos:", results)
    
    
    console.log("CSV creado");
    writer.pipe(fileStream);
    console.log("Escribiendo")
    results.forEach((row) => {
        writer.write([row.id_ruta, row.nombre, row.descripcion]);//constructor del archivo, adecuar a los datos de la consulta sql
    });
    writer.end();
    connection.end();
});

console.log("CSV guardado")
