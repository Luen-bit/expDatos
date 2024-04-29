//const { query } = require("express");
const mysql = require("mysql");
const fs = require('fs');
const csvWriter = require("csv-write-stream");
const writer = csvWriter({headers: ['sanitarioLimpio', 'aguaPotable', 'fugas','jabon','toallas', 'cestoBasuraSanitario','cestoVacioSanitario','bolsaPLasticaSanitario','señalamientosSanitario','señal1Sanitario','señal2Sanitario', 'señal3Sanitario','matLimpSanIdentificado','matLimpDosp','areaDesechosLimpSanitario']});//cabeceras del archivo, comprobar nombres
const fileStream = fs.createWriteStream("G:/Mi unidad/Huertos-157755893/localsanitario.csv")//directorio donde se guardara el archivo, comprobar ruta

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



connection.query("SELECT * FROM  inspecciones", (err, results) => {//consulta SQL, sera proporcionanda por jaime
    if (err) throw err;
    console.log("datos:", results)
    
    
    console.log("CSV creado");
    writer.pipe(fileStream);
    console.log("Escribiendo")
    results.forEach((row) => {
        writer.write([row.sanitarioLimpio, row.aguaPotable, row.fugas,row.jabon, row.toallas, row.cestoBasuraSanitario,row.cestoVacioSanitario,row.bolsaPlasticaSanitario,row.senalamientosSanitario,row.senal1Sanitario,row.senal2Sanitario, row.senal3Sanitario,row.matLimpSanitarioIdent,row.matLimpSaniDispo,row.areaDesechosLimpSani]);//constructor del archivo, adecuar a los datos de la consulta sql
    });
    writer.end();
    connection.end();
});



console.log("CSV guardado - sanitario")

