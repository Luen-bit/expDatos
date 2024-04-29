//const { query } = require("express");
const mysql = require("mysql");
const fs = require('fs');
const csvWriter = require("csv-write-stream");
const writer = csvWriter({headers: ['mesa', 'sillas', 'comedorLimpio','botiquin','depositoOrganicoInorganico','cestosBasuraComedor', 'cestoComedorVacio','bolsaCestoComedor','parrilla','señalamientosComedor','señal1Comedor','señal2Comedor','señal3Comedor','trampaRoedores','señalRatonera','ratonera','alimentoRatonera','puertaAbiertaRatonera','matLimpIdentComedor','areaDesLimpComedor']});//cabeceras del archivo, comprobar nombres
const fileStream = fs.createWriteStream("G:/Mi unidad/Huertos-157755893/localComedor.csv")//directorio donde se guardara el archivo, comprobar ruta

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
        writer.write([row.mesa, row.silla, row.comedorLimpio, row.botiquin,  row.depositoOrganicoInorganico , row.cestoBasuraComedor, row.cestoBasuraComedorVacio ,row.bolsaCestoComedor ,row.parrilla ,row.senalamientosComedor ,row.senal1Comedor ,row.senal2Comedor ,row.senal3Comedor, row.trampaRoedores, row.senalRatonera , row.ratonera, row.alimentoRatonera, row.puertaAbiertaRatonera, row.matLimpIdentComedor, row.areaDesLimpComedor]);//constructor del archivo, adecuar a los datos de la consulta sql
    });
    writer.end();
    connection.end();
});



console.log("CSV guardado - comedor")

