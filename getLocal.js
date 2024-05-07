//const { query } = require("express");
const mysql = require("mysql");
const fs = require('fs');
const csvWriter = require("csv-write-stream");

const writer = csvWriter({headers: ['sanitarioLimpio', 'aguaPotable', 'fugas','jabon','taollas', 'cestoBasuraSanitario','cestoVacioSanitario','bolsaPlasticaSanitario','señalamientosSanitario','señal1Sanitario','señal2Sanitario', 'señal3Sanitario','matLimpSanIdentificado','matLimpDisp','areaDesechosLimpSanitario']});//cabeceras del archivo, comprobar nombres
const writerCom = csvWriter({headers: ['mesa', 'sillas', 'comedorLimpio','botiquin','depositoOrganicoInorganico','cestosBasuraComedor', 'cestoComedorVacio','bolsaCestoComedor','parrilla','señalamientosComedor','señal1Comedor','señal2Comedor','señal3Comedor','trampaRoedores','señalRatonera','ratonera','alimentoRatonera','puertaAbiertaRatonera','matLimpIdentComedor','areaDesLimpComedor']});//cabeceras del archivo, comprobar nombres
const writerCerca = csvWriter({headers: ['accesoControlado','libreAnimales','hesesFecales','animalesConfinados']});
const writerAOP = csvWriter({headers: ['Identificada','acondicionada']});
const writerAM = csvWriter({headers: ['buenEstadoAM','limpiaAM','ordenadaAM','jaulaEnvases','matContDerraAM', 'fosa', 'fosaFuncional', 'señalesAM']});
const writerUP = csvWriter({headers: ['maleza','basuraUP', 'materialDesuso']});
const writerAQ = csvWriter({headers: ['limpioAlmAgro','prodSepaIdent', 'bajoLlave','materialDerrameAlmagro','señalesAlmAgro', 'retenDerrame']});//cabeceras del archivo, comprobar nombres
const writerTools = csvWriter({headers: ['herramientaOrdenada','señalesHerramienta', 'ratoneraHerramienta']});
const writerAgua = csvWriter({headers: ['depositoLimpio','circulado', 'señalesAgua']});
const writerMaq = csvWriter({headers: ['maquinariaLimpia','ratoneraMaquinaria']});

const fileStream = fs.createWriteStream("G:/Mi unidad/Huertos-157755893/localsanitario.csv")//directorio donde se guardara el archivo, comprobar ruta
const fileStreamCom = fs.createWriteStream("G:/Mi unidad/Huertos-157755893/localComedor.csv")//directorio donde se guardara el archivo, comprobar ruta
const fileStreamCerca = fs.createWriteStream("G:/Mi unidad/Huertos-157755893/localCercado.csv")
const fileStreamAOP = fs.createWriteStream("G:/Mi unidad/Huertos-157755893/localAOP.csv")//directorio donde se guardara el archivo, comprobar ruta
const fileStreamAM = fs.createWriteStream("G:/Mi unidad/Huertos-157755893/localAM.csv")//directorio donde se guardara el archivo, comprobar ruta
const fileStreamUP = fs.createWriteStream("G:/Mi unidad/Huertos-157755893/localUP.csv")
const fileStreamAQ = fs.createWriteStream("G:/Mi unidad/Huertos-157755893/localAQ.csv")
const fileStreamTools = fs.createWriteStream("G:/Mi unidad/Huertos-157755893/localTools.csv")//directorio donde se guardara el archivo, comprobar ruta
const fileStreamAgua = fs.createWriteStream("G:/Mi unidad/Huertos-157755893/localAgua.csv")//directorio donde se guardara el archivo, comprobar ruta
const fileStreamMaq = fs.createWriteStream("G:/Mi unidad/Huertos-157755893/localMaq.csv")//directorio donde se guardara el archivo, comprobar ruta




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
    console.log("Escribiendo sanitario")
    results.forEach((row) => {
        writer.write([row.sanitarioLimpio, row.aguaPotable, row.fugas,row.jabon, row.toallas, row.cestoBasuraSanitario,row.cestoVacioSanitario,row.bolsaPlasticaSanitario,row.senalamientosSanitario,row.senal1Sanitario,row.senal2Sanitario, row.senal3Sanitario,row.matLimpSanitarioIdent,row.matLimpSaniDispo,row.areaDesechosLimpSani]);//constructor del archivo, adecuar a los datos de la consulta sql
    });
    writer.end();

    writerCom.pipe(fileStreamCom);
    console.log("Escribiendo comedor")
    results.forEach((row) => {
        writerCom.write([row.mesa, row.silla, row.comedorLimpio, row.botiquin,  row.depositoOrganicoInorganico , row.cestoBasuraComedor, row.cestoBasuraComedorVacio ,row.bolsaCestoComedor ,row.parrilla ,row.senalamientosComedor ,row.senal1Comedor ,row.senal2Comedor ,row.senal3Comedor, row.trampaRoedores, row.senalRatonera , row.ratonera, row.alimentoRatonera, row.puertaAbiertaRatonera, row.matLimpIdentComedor, row.areaDesLimpComedor]);//constructor del archivo, adecuar a los datos de la consulta sql
    });
    writerCom.end();

    writerCerca.pipe(fileStreamCerca);
    console.log("Escribiendo cerca")
    results.forEach((row) => {
        writerCerca.write([row.accesoControlador,row.libreAnimales, row.heses, row.animalesConfinados ]);//constructor del archivo, adecuar a los datos de la consulta sql
    });
    writerCerca.end();

    writerAOP.pipe(fileStreamAOP);
    console.log("Escribiendo AOP")
    results.forEach((row) => {
        writerAOP.write([row.AOPIdentificada, row.AOPAcondicionada]);//constructor del archivo, adecuar a los datos de la consulta sql
    });
    writerAOP.end();

    writerAM.pipe(fileStreamAM);
    console.log("Escribiendo AM")
    results.forEach((row) => {
        writerAM.write([row.buenEstadoAM, row.limpiaAM,row.ordenadaAM, row.jaulaEnvases, row.matContDerramesAM, row.fosa, row.fosaFuncional, row.senalesAM]);//constructor del archivo, adecuar a los datos de la consulta sql
    });
    writerAM.end();

    writerUP.pipe(fileStreamUP);
    console.log("Escribiendo UP")
    results.forEach((row) => {
        writerUP.write([row.malezaUP, row.basuraUP, row.materialDesusoUP]);//constructor del archivo, adecuar a los datos de la consulta sql
    });
    writerUP.end();

    writerAQ.pipe(fileStreamAQ);
    console.log("Escribiendo AQ")
    results.forEach((row) => {
        writerAQ.write([row.limpioAlmAgroq, row.prodSepIdent, row.bajoLlave, row.matDerrameAgroq, row.senalesAlmAgroq, row.retenDerrame]);//constructor del archivo, adecuar a los datos de la consulta sql
    });
    writerAQ.end();
   
    writerTools.pipe(fileStreamTools);
    console.log("Escribiendo tools")
    results.forEach((row) => {
        writerTools.write([row.herramientasOrdenadas, row.senalesHerramientas, row.ratoneraHerramienta]);//constructor del archivo, adecuar a los datos de la consulta sql
    });
    writerTools.end();

    writerAgua.pipe(fileStreamAgua);
    console.log("Escribiendo agua")
    results.forEach((row) => {
        writerAgua.write([row.depositoLimpio, row.circulado, row.senalesAgua]);//constructor del archivo, adecuar a los datos de la consulta sql
    });
    writerAgua.end();


    writerMaq.pipe(fileStreamMaq);
    console.log("Escribiendo Maq")
    results.forEach((row) => {
        writerMaq.write([row.maquinariaLimpia, row.ratoneraMaquinaria]);//constructor del archivo, adecuar a los datos de la consulta sql
    });
    writerMaq.end();

    connection.end();
});



console.log("CSV guardado - sanitario")

