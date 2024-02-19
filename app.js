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

conection.connect(function(error) {
    var delete_query = "TRUNCATE TABLE inspecciones";
    conection.query(delete_query, function (error, result) {	  
      console.log("All rows deleted Successfully!");
  });
  });


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
    const query = "INSERT INTO inspecciones (folioInspeccion,rutaID, huertaID, fecha, almacenAgroquicmicos, areaHerramientas, almacenAgua,areaMaquinaria,sanitarioLimpio, aguaPotable, fugas, jabon, toallas, cestoBasuraSanitario, cestoVacioSanitario, bolsaPlasticaSanitario, senalamientosSanitario, senal1Sanitario, senal2Sanitario, senal3Sanitario, matLimpSanitarioIdent, matLimpSaniDispo, areaDesechosLimpSani, mesa, silla, comedorLimpio, botiquin, depositoOrganicoInorganico, cestoBasuraComedor, cestoBasuraComedorVacio, bolsaCestoComedor, parrilla, senalamientosComedor, senal1Comedor, senal2Comedor,senal3Comedor, trampaRoedores, senalRatonera, ratonera, alimentoRatonera, puertaAbiertaRatonera, matLimpIdentComedor, areaDesLimpComedor, accesoControlador, libreAnimales, heses, animalesConfinados, AOPIdentificada, AOPAcondicionada, buenEstadoAM, limpiaAM, ordenadaAM, jaulaEnvases, matContDerramesAM, fosa, fosaFuncional, senalesAM, malezaUP, basuraUP, materialDesusoUP,limpioAlmAgroq, prodSepIdent, bajoLlave, matDerrameAgroq,senalesAlmAgroq, retenDerrame,herramientasOrdenadas, senalesHerramientas,ratoneraHerramienta, depositoLimpio, circulado, senalesAgua, maquinariaLimpia, ratoneraMaquinaria, nota, evaluador) VALUES ?"
    const values = dataArray.map(item => [item.folioInspeccion,item.rutaID, item.huertaID, item.fecha, item.almacenAgroquimicos, item.areaHerramientas, item.almacenAgua, item.areaMaquinaria,item.sanitarioLimpio, item.aguaPotable, item.fugas, item.jabon, item.taollas, item.cestoBasuraSanitario, item.cestoVacioSanitario, item.bolsaPlasticaSanitario, item.señalamientosSanitario, item.señal1Sanitario,item.señal2Sanitario, item.señal3Sanitario, item.matLimpSanIdentificado, item.matLimpDisp, item.areaDesechosLimpSanitario, item.mesa, item.sillas, item.comedorLimpio, item.botiquin, item.depositoOrganicoInorganico, item.cestosBasuraComedor, item.cestoComedorVacio, item.bolsaCestoComedor, item.parrilla, item.señalamientosComedor, item.señal1Comedor, item.señal2Comedor, item.señal3Comedor,item.trampaRoedores, item.señalRatonera, item.ratonera,item.alimentoRatonera, item.puertaAbiertaRatonera, item.matLimpIdentComedor, item.areaDesLimpComedor, item.accesoControlado, item.libreAnimales, item.hesesFecales, item.animalesConfinados, item.Identificada, item.acondicionada, item.buenEstadoAM, item.limpiaAM, item.ordenadaAM, item.jaulaEnvases, item.matContDerraAM, item.fosa, item.fosaFuncional, item.señalesAM, item.maleza, item.basuraUP, item.materialDesuso, item.limpioAlmAgro, item.prodSepaIdent, item.bajoLlave, item.materialDerrameAlmagro, item.señalesAlmAgro, item.retenDerrame, item.herramientaOrdenada, item.señalesHerramienta, item.ratoneraHerramienta, item.depositoLimpio, item.circulado, item.señalesAgua, item.maquinariaLimpia, item.ratoneraMaquinaria, item.nota, item.evaluador])

    conection.query(query,[values],(err,results)=>{
        if (err) throw err;
        console.log(values)
        console.log("Datos insertados")
        conection.end();
    })
}