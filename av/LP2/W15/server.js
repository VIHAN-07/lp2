const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile('C:/Users/advai/Advait_Assignment/LP2/W15/index.html');
})

app.get('/products',(req,res)=>{
    fs.readFile("product.json",(err,data)=>{
        if(err){
            res.status(500).send("file not open");
            return;
        }
        res.json(JSON.parse(data));
    })
})

app.listen(3300,()=>{
    console.log("server is running");
})
