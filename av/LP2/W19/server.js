const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/studentDB');

const schema = new mongoose.Schema({
    Name:{type:String,required:true},
    RollNo:{type:Number,required:true,min:1,max:999,unique:true},
    WAD_Marks:{type:Number,min:0,max:50},
    CC_Marks:{type:Number,min:0,max:50},
    DSBDA_Marks:{type:Number,min:0,max:50},
    CNS_Marks:{type:Number,min:0,max:50},
    AI_Marks:{type:Number,min:0,max:50},
})

const Marks = mongoose.model('student_marks',schema);

app.get('/',(req,res)=>{
    res.sendFile('C:/Users/advai/Advait_Assignment/LP2/W19/index.html');
})

addStudents();
async function addStudents(){
    try{
        const count=await Marks.countDocuments();
        if(count==0){
            await Marks.insertMany([
                {Name:"Advait", RollNo:1,WAD_Marks:26,CC_Marks:45,DSBDA_Marks:19,CNS_Marks:34,AI_Marks:19},
                {Name:"Vihan", RollNo:2,WAD_Marks:24,CC_Marks:15,DSBDA_Marks:23,CNS_Marks:14,AI_Marks:21},
                {Name:"Jyot", RollNo:3,WAD_Marks:41,CC_Marks:23,DSBDA_Marks:15,CNS_Marks:43,AI_Marks:15},
                {Name:"Manas", RollNo:4,WAD_Marks:47,CC_Marks:34,DSBDA_Marks:42,CNS_Marks:17,AI_Marks:19},
                {Name:"Aditi", RollNo:5,WAD_Marks:23,CC_Marks:28,DSBDA_Marks:26,CNS_Marks:28,AI_Marks:32}
            ])
            console.log("data loaded");
        }
    }catch(err){
        console.log(err);
    }
}

app.get('/less20',async (req,res)=>{
    try{
        const obj = await Marks.find().where('DSBDA_Marks').gt(20);
        res.json(obj);
    }catch(err){
        console.log(err);
    }
});

app.get('/getStudents',async (req,res)=>{
    try{
        const obj = await Marks.find();
        res.json(obj);
    }
    catch(err){
        console.log(err);
    }
});

app.get('/countStudents',async (req,res)=>{
    try{
        const count = await Marks.countDocuments();
        res.json(count);
    }catch(err){
        console.log(err);
    }
});

app.get('/update/:RollNo',async (req,res)=>{
    try{
    const obj = await Marks.updateOne({RollNo:Number(req.params.RollNo)},{$inc:{WAD_Marks:-10,CC_Marks:-10,DSBDA_Marks:-10,CNS_Marks:-10,AI_Marks:-10}});
    res.json(obj);
    }catch(err){
        console.log(err);
    }
});

app.get('/marks25',async (req,res)=>{
    try{
        const obj = await Marks.find({WAD_Marks:{$gt:25},CC_Marks:{$gt:25},DSBDA_Marks:{$gt:25},CNS_Marks:{$gt:25},AI_Marks:{$gt:25}});
        res.json(obj);
    }catch(err){
        console.log(err);
    }
});
app.get('/less40',async (req,res)=>{
    try{
        const obj = await Marks.find({CNS_Marks:{$lt:40},AI_Marks:{$lt:40}});
        res.json(obj);
    }catch(err){
        console.log(err);
    }
});

app.get('/delete/:RollNo',async (req,res)=>{
    try{
        const obj = await Marks.findOneAndDelete().where('RollNo').equals(Number(req.params.RollNo));
        res.json(obj);
    }catch(err){
        console.log(err);
        res.status(500).send("Could not find");
    }
});

app.post('/insertStudent',async (req,res)=>{
    try{
        const result = await Marks.create(req.body);
        res.json(result);
    }catch(err){
        console.log(err);
    }
})

app.listen(3000,()=>{
    console.log("Server Running");
});