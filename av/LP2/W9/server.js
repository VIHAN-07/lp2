const express = require('express');
const fs = require('fs')

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile('C:/Users/advai/Advait_Assignment/LP2/W9/index.html');
})

app.get('/weather/:city',(req,res)=>{
    fs.readFile('C:/Users/advai/Advait_Assignment/LP2/W9/weather.json',(err,data)=>{
        if(err){
            res.status(404).send("Not Found");
        }
        const output =JSON.parse(data);
        res.json(output.find(element=>element.city==req.params.city));
    });
})

app.listen(3000,()=>{
    console.log("server is running");
})