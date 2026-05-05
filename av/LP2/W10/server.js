const express = require('express')
const mongoose = require('mongoose')

const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/toDo');

const schema = new mongoose.Schema({
    todo:{type:String, required: true}
})

const list = mongoose.model('todo',schema);

app.get('/',(req,res)=>{
    res.sendFile('C:/Users/advai/Advait_Assignment/LP2/W10/index.html');
})


app.get('/get',async (req,res)=>{
    try{
        const obj = await list.find();
        res.json(obj);
    }catch(err){
        console.log(err);
    }
})

app.post('/add',async (req,res)=>{
    try{
        const obj = await list.insertOne(req.body);
        res.json(obj);
    }catch(err){
        console.log(err);
    }
})

app.delete("/delete/:todo",async(req,res)=>{
    try{
        const obj = await list.findOneAndDelete().where('todo').equals(req.params.todo);
        res.json(obj);
    }catch(err){
        console.log(err);
    }
})

app.listen(3500,()=>{
    console.log("server is running");
})