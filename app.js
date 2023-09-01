const mysql = require("mysql");
const express = require("express");
const csvParser = require('csv-parser');
const fs = require("fs");
const { error } = require("console");
const app = express();

const conection = mysql.createConnection({
    host:'localhost',
    user: "root",
    password: "",
    database:"test"
})
conection.connect((err)=>{
    if(err)throw err;
    console.log("Conectado a la base de datos");
})
const results = [];
fs.createReadStream('evaluacionHuertosLimpios - query.csv')
    .pipe(csvParser())
    .on('data',(data)=>{
        results.push(data);
    })
    .on('end', ()=>{
        console.log("CSV leido")
        insertarDatosEnMysql(results);
    });

function insertarDatosEnMysql(dataArray){
    const query = "INSERT INTO datoseval (id, huertoID, ingenieroID, fecha, limpio, agua_potable, fugas, jabon_liq_antivac, toallas_papel, cestos_basura, cesto_100p_libre, cesto_bolsa_plas, señalamientos_visibles, señal_1_sanitario, señal_2_sanitario, señal_3_sanitario, cuenta_mat_limp, mat_identificado, area_desecho, mesa, sillas_bancas, comedor_limpio, botiquin_abastecido, dpsto_organica_inorganica, cestos_basura_comedor, cesto_100p_libreCom, cesto_bolsa, chimenea_parrilla, señales_visibles, señal_1_com, señal_2_com,señal_3_com, trampa_roedores, señal_roedor, ratonera, alimento_ratonera, ratonera_abierta, mat_limpieza_identificado, area_desechos_limpieza, acceso_controlado, animales, heces_fecales, animales_confinados, Identificada, acondicionada, Buen_estado, limpia, ordenada, jaula_envases_vacios, material_contener_derrames, fosa_derrames, fosa_funcional, señalamientos, sin_maleza, sin_basura, material_desuso, conjunto_error) VALUES ?"
    const values = dataArray.map(item => [item.folioInspeccion, item.huertoID, item.ingenieroID, item.fecha, item.limpio, item.agua_potable, item.fugas, item.jabon_liq_antivac, item.toallas_papel, item.cestos_basura, item.cesto_100p_libre, item.cesto_bolsa_plas, item.señalamientos_visibles, item.señal_1_sanitario,item.señal_2_sanitario, item.señal_3_sanitario, item.cuenta_mat_limp, item.mat_identificado, item.area_desecho, item.mesa, item.sillas_bancas, item.comedor_limpio, item.botiquin_abastecido, item.dpsto_organica_inorganica, item.cestos_basura_comedor, item.cesto_100p_libreCom, item.cesto_bolsa, item.chimenea_parrilla, item.señales_visibles, item.señal_1_com, item.señal_2_com, item.señal_3_com,item.trampa_roedores, item.señal_roedor, item.ratonera,item.alimento_ratonera, item.ratonera_abierta, item.mat_limpieza_identificado, item.area_desechos_limpieza, item.acceso_controlado, item.animales, item.heces_fecales, item.animales_confinados, item.Identificada, item.acondicionada, item.Buen_estado, item.limpia, item.ordenada, item.jaula_envases_vacios, item.material_contener_derrames, item.fosa_derrames, item.fosa_funcional, item.señalamientos, item.sin_maleza, item.sin_basura, item.material_desuso, item.conjunto_error])

    conection.query(query,[values],(err,results)=>{
        if (err) throw err;
        console.log(values)
        console.log("Datos insertados")
        conection.end();
    })
}