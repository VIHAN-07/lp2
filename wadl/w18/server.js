const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/music")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// SCHEMA
const songSchema = new mongoose.Schema({
  Songname: String,
  Film: String,
  Music_director: String,
  singer: String,
  Actor: String,
  Actress: String
});

const Song = mongoose.model("Song", songSchema);

// a, b, c) Insert 5 songs
app.get("/insert", async (req, res) => {
  await Song.deleteMany(); // reset

  const songs = [
    { Songname: "Kesariya", Film: "Brahmastra", Music_director: "Pritam", singer: "Arijit Singh" },
    { Songname: "Tum Hi Ho", Film: "Aashiqui 2", Music_director: "Mithoon", singer: "Arijit Singh" },
    { Songname: "Malang", Film: "Malang", Music_director: "Mithoon", singer: "Ved Sharma" },
    { Songname: "Kal Ho Na Ho", Film: "KHNH", Music_director: "Shankar", singer: "Sonu Nigam" },
    { Songname: "Channa Mereya", Film: "ADHM", Music_director: "Pritam", singer: "Arijit Singh" }
  ];

  await Song.insertMany(songs);
  res.send("5 Songs Inserted");
});

// d) Count + List all
app.get("/all", async (req, res) => {
  const songs = await Song.find();
  res.send({
    count: songs.length,
    data: songs
  });
});

// e) Songs by Music Director
app.get("/director/:name", async (req, res) => {
  const songs = await Song.find({ Music_director: req.params.name });
  res.send(songs);
});

// f) Songs by Director + Singer
app.get("/director/:name/singer/:singer", async (req, res) => {
  const songs = await Song.find({
    Music_director: req.params.name,
    singer: req.params.singer
  });
  res.send(songs);
});

// g) Delete song
app.get("/delete/:song", async (req, res) => {
  await Song.deleteOne({ Songname: req.params.song });
  res.send("Song Deleted");
});

// h) Add new song
app.get("/add", async (req, res) => {
  await Song.create({
    Songname: "Apna Bana Le",
    Film: "Bhediya",
    Music_director: "Sachin-Jigar",
    singer: "Arijit Singh"
  });
  res.send("Song Added");
});

// i) Songs by singer + film
app.get("/filter/:singer/:film", async (req, res) => {
  const songs = await Song.find({
    singer: req.params.singer,
    Film: req.params.film
  });
  res.send(songs);
});

// j) Update (add Actor/Actress)
app.get("/update/:song", async (req, res) => {
  await Song.updateOne(
    { Songname: req.params.song },
    { Actor: "Ranbir Kapoor", Actress: "Alia Bhatt" }
  );
  res.send("Updated with Actor/Actress");
});

// k) Show table format
app.get("/table", async (req, res) => {
  const songs = await Song.find();

  let html = `
  <h2>Song Table</h2>
  <table border="1" cellpadding="10">
    <tr>
      <th>Song</th>
      <th>Film</th>
      <th>Director</th>
      <th>Singer</th>
      <th>Actor</th>
      <th>Actress</th>
    </tr>
  `;

  songs.forEach(s => {
    html += `
      <tr>
        <td>${s.Songname}</td>
        <td>${s.Film}</td>
        <td>${s.Music_director}</td>
        <td>${s.singer}</td>
        <td>${s.Actor || "-"}</td>
        <td>${s.Actress || "-"}</td>
      </tr>
    `;
  });

  html += "</table>";

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});