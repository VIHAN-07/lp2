
const express = require('express')
const mongoose = require('mongoose')
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/musicdb');

app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile('C:/Users/advai/Advait_Assignment/LP2/W18/index.html')
})

const musicSchema = new mongoose.Schema({
    Songname:{type: String ,required:true},
    Film:{type: String ,required:true},
    Music_director:{type: String ,required:true},
    singer:{type: String ,required:true},
    Actor:{type: String},
    Actress:{type: String}
})

const Song=mongoose.model("music_detains",musicSchema);
addData();
async function addData(){
    const count = await Song.countDocuments();
    if(count==0){
        await Song.insertMany([
            { Songname: 'Kesariya', Film: 'Brahmastra', Music_director: 'Pritam', singer: 'Arijit Singh' },
            { Songname: 'Apna Bana Le', Film: 'Bhediya', Music_director: 'Sachin-Jigar', singer: 'Arijit Singh' },
            { Songname: 'Pasoori', Film: 'Coke Studio', Music_director: 'Ali Sethi', singer: 'Shae Gill' },
            { Songname: 'Natu Natu', Film: 'RRR', Music_director: 'M.M. Keeravani', singer: 'Rahul Sipligunj' },
            { Songname: 'Tum Hi Ho', Film: 'Aashiqui 2', Music_director: 'Mithoon', singer: 'Arijit Singh' }
        ])
    }
    console.log("Inserted the data");
}

app.get('/api/songCount',async (req,res)=>{
    try{
        const count = await Song.countDocuments();
        res.status(200);
        res.json({count});
    }catch(err){
        console.error(err);
    }
})

app.get('/director/:singer',async (req,res)=>{
    try{
        const output = await Song.find().where("singer").equals(req.params.singer);
        res.json(output);
    }catch(err){
        console.error(err);
    }
})

app.get('/delete/:name',async (req,res)=>{
    try{
        const output = await Song.deleteOne().where('Songname').equals(req.params.name);
        console.log(await Song.find());
        res.json(output);
    }catch(err){
        console.error(err);
    }
})
app.get('/update',async (req,res)=>{
    try{
        const obj=await Song.updateMany({Songname:"Kesariya"},{$set:{Actor:'Ranbir',Actress:'Alia'}})
        res.send(obj);
    }catch(err){
        console.error(err);
    }
})

app.get('/getList',async(req,res)=>{
    try{
        const obj = await Song.find();
        res.json(obj);
    }catch(err){
        console.log(err);
    }
})

app.post('/addSong',async (req,res)=>{
    try{
        const output = await Song.create(req.body);
        res.json(output);
    }catch(err){
        console.log(err);
    }
})

app.listen(3500,()=>{
    console.log("server is running");
})






