//const { query } = require("express");
const mysql = require("mysql");
const fs = require('fs');
const csvWriter = require("csv-write-stream");
const writer = csvWriter({headers: ['id', 'nombre', 'telefono', 'correo']});
const fileStream = fs.createWriteStream("G:/Mi unidad/Huertos-157755893/dataInges.csv")

const connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database: "test"
});

connection.connect((err) =>{
    if (err) throw err;
    console.log("Conectado a la base datos");
})

connection.query("SELECT * FROM  ingenieros", (err, results) => {
    if (err) throw err;
    console.log("datos:", results)
    
    
    console.log("CSV creado");
    writer.pipe(fileStream);
    //writer.write({headers: ['id_huerta', 'nombre', 'regSagarpa', 'responsable']});
    //writer.write(['1','2','3','4']);
    console.log("Escribiendo")
    results.forEach((row) => {
        writer.write([row.id, row.nombre, row.telefono, row.correo]);
    });
    writer.end();
    connection.end();
});



console.log("CSV guardado")
