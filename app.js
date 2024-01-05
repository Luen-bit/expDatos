const mysql = require("mysql");
const express = require("express");
const csvParser = require('csv-parser');
const fs = require("fs");
const { error } = require("console");
const app = express();

const conection = mysql.createConnection({
    host:'localhost',//direccion Ip del servidor
    user: "root",//usuario
    password: "",//contraseña
    database:"test"//nombre de la base de datos
})
conection.connect((err)=>{
    if(err)throw err;
    console.log("Conectado a la base de datos");
})
const results = [];
fs.createReadStream('evaluacionHuertosLimpios - EvaluacionV2.csv')//toma el archivo csv, comprobar nombre del archivo
    .pipe(csvParser())
    .on('data',(data)=>{
        results.push(data);
    })
    .on('end', ()=>{
        console.log("CSV leido")
        insertarDatosEnMysql(results);
    });

function insertarDatosEnMysql(dataArray){//inserta datos en la tabla que se guardara los registros de las visitas, comprobrar nombre de tabla
    const query = "INSERT INTO inspecciones (folioInspeccion,rutaID, huertaID, fecha, sanitarioLimpio, aguaPotable, fugas, jabon, toallas, cestoBasuraSanitario, cestoVacioSanitario, bolsaPlasticaSanitario, senalamientosSanitario, senal1Sanitario, senal2Sanitario, senal3Sanitario, matLimpSanitarioIdent, matLimpSaniDispo, areaDEsechosLimpSani, mesa, silla, comedorLimpio, botiquin, depositoOrganicoInorganico, cestoBasuraComedor, cestoBasuraComedorVacio, bolsaCestoComedor, parrilla, senalamientosComedor, senal1Comedor, senal2Comedor,senal3Comedor, trampaRoedores, senalRatonera, ratonera, alimentoRatonera, puertaAbiertaRatonera, matLimpIdentComedor, areaDesLimpComedor, accesoControlador, libreanimales, heses, animalesConfinados, AOPIdentificada, AOPAcondicionada, buenEstadoAM, limpiaAM, ordenadaAM, jaulaEnvases, matContDerramesAM, fosa, fosaFuncional, senalesAM, malezaUP, basuraUP, materialDesusoUP, conjunto_error) VALUES ?"
    const values = dataArray.map(item => [item.folioInspeccion,item.rutaID, item.huertaID, item.fecha, item.limpio, item.aguaPotable, item.fugas, item.jabon, item.toallas, item.cestoBasuraSanitario, item.cestoVacioSanitario, item.bolsaPLasticaSanitario, item.senalamientosSanitario, item.señal1Sanitario,item.señal2Sanitario, item.señal3Sanitario, item.matLimpSanIdentificado, item.matLimpDisp, item.area_desecho, item.mesa, item.sillas, item.comedorLimpio, item.botiquin, item.depositoOrganicoInorganico, item.cestoBasuraComedor, item.cestoComedorVacio, item.bolsaCestoComedor, item.parrilla, item.senalamientosComedor, item.señal1Comedor, item.señal2Comedor, item.señal3Comedor,item.trampaRoedores, item.señalRatonera, item.ratonera,item.alimentoRatonera, item.puertaAbiertaRatonera, item.matLimpIdentComedor, item.areaDesLimpComedor, item.accesoControlado, item.animales, item.hesesFecales, item.animalesConfinados, item.AOPIdentificada, item.AOPAcondicionada, item.buenEstadoAM, item.limpiaAM, item.ordenadaAM, item.jaulaEnvases, item.matContDerramesAM, item.fosa, item.fosaFuncional, item.senalesAM, item.malezaUP, item.basuraUP, item.materialDesusoUP, item.conjunto_error])

    conection.query(query,[values],(err,results)=>{
        if (err) throw err;
        console.log(values)
        console.log("Datos insertados")
        conection.end();
    })
}