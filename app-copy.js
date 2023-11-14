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

function insertarDatosEnMysql(dataArray){ //inserta datos en la tabla que se guardara los registros de las visitas, comprobrar nombre de tabla
    const query = "INSERT INTO evalucionv2 (folioInspeccion,rutaID,huertaID,fecha,YN_almAgroq,YN_AreaHer,YN_almAgua,YN_areaMaq,saniLimpio,aguaPotable,fugas,jabon,toallas,cestoBasura_sani,cestoVacio_sani,bolsaPlast_sani,senalamientos_sani,senal1_sani,senal2_sani,senal3_sani,matLimpIdent_sani,matLimpDisp_sani,areaDesLimp_sani,mesa,sillas,comedorLimpio,botiquin,depOrgInorg,cestoBas_com,cestoBasVacio_com,bolsaCestoBas_com,parrilla,senalamietos_com,senal1_com,senal2_com,senal3_com,trampaRoedores,senalRatonera,ratonera,aliementoRatonera,puertaRatonera,matLimpIdent_com,areaDesLimp_com,accesoControlado,libreAnimales,hesesFecales,animalesConfinados,identificada_AOP,acondicionada_AOP,buenEstado_AM,limpia_AM,jaulaEnvases,matcontDerr_AM,fosa,fosaFuncional,senalesAM,maleza,basuraUP,materialDesuso,limpio_almAgroq,prodSepIdent,bajoLlave,matDerr_almAgroq,senales_almAgroq,retenDerrame,herrOrdenada,senalesHerramienta,ratonera_herr,depositoLimpio,circulado,senalesAgua,maq_limpia,ratonera_maquinaria,evaluador) VALUES ?"
    const values = dataArray.map(item => [item.folioInspeccion, item.rutaID, item.huertaID, item.fecha, item.almacenAgroquimicos,item.areaHerramientas, item.almacenAgua, item.areaMaquinaria, item.sanitarioLimpio, item.aguaPotable, item.fugas, item.jabon, item.taollas,item.cestoBasuraSanitario , item.cestoVacioSanitario, item.bolsaPlasticaSanitario, item.señalamientosSanitario, item.señal1Sanitario, item.señal2Sanitario, item.señal3Sanitario, item.matLimpSanIdentificado, item.matLimpDisp, item.areaDesechosLimpSanitario, item.mesa, item.sillas, item.comedorLimpio, item.botiquin, item.depositoOrganicoInorganico, item.cestosBasuraComedor, item.cestoComedorVacio, item.bolsaCestoComedor,item.parrilla, item.señalamientosComedor, item.señal1Comedor,item.señal2Comedor, item.señal3Comedor, item.trampaRoedores, item.señalRatonera, item.ratonera, item.alimentoRatonera, item.puertaAbiertaRatonera, item.matLimpIdentComedor, item.areaDesLimpComedor, item.accesoControlado, item.libreAnimales, item.hesesFecales, item.animalesConfinados, item.Identificada, item.acondicionada, item.buenEstadoAM, item.limpiaAM, item.ordenadaAM, item.jaulaEnvases, item.matContDerraAM, item.fosa, item.fosaFuncional, item.señalesAM,item.maleza, item.basuraUP, item.materialDesuso, item.limpioAlmAgro, item.prodSepaIdent, item.bajoLlave, item.materialDerrameAlmagro,item.señalesAlmAgro, item.retenDerrame, item.herramientaOrdenada, item.señalesHerramienta, item.ratoneraHerramienta, item.depositoLimpio, item.circulado, item.señalesAgua, item.maquinariaLimpia,item.evaluador ])

    conection.query(query,[values],(err,results)=>{
        if (err) throw err;
        console.log(values)
        console.log("Datos insertados")
        conection.end();
    })
}