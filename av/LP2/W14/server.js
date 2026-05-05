const express=require('express');
const fs = require('fs')
const app = express();

app.get('/',(req,res)=>{
    res.sendFile("C:/Users/advai/Advait_Assignment/LP2/W14/index.html");
});

app.get('/api/users',(req,res)=>{
    fs.readFile('users.json','utf8',(err,data)=>{
        if(err){
            res.status(500).send("Error reading file");
            return;
        }
        res.json(JSON.parse(data));
    })

})
// app.get('/about',(req,res)=>{
//     res.send("this is about page");
// });

// app.get('/product',(req,res)=>{
//     res.json([
//         {id:1,name:'Laptop',price:1299},
//         {id:2,name:'Phone',price:1500},
//     ])
// });

// app.get('/product/:id', (req,res)=>{
//     const id = Number(req.params.id);

//     const product=[
//         {id:1,name:'Laptop',price:1299},
//         {id:2,name:'Phone',price:1500},
//     ];
    
//     const requestedProduct = product.find((product)=>product.id===id)
//     res.json(requestedProduct);

// });

// app.get('/message',(req,res)=>{
//     res.json({message:"hello from express backend"})

// })
app.listen(3500 ,()=>{
    console.log("server is running");
});