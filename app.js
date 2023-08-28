const express = require("express");
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.sendFile("datos.csv")
})




app.listen(3010,function(){
    console.log("Servidor corriendo en http://localhost:3010/exportcsv");
})  