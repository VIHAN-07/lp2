const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// SCHEMA
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  genre: String
});

const Book = mongoose.model("Book", bookSchema);


// ================== ADD BOOK ==================
app.get("/add", async (req, res) => {
  await Book.create({
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    genre: "Self-help"
  });

  res.send("Book Added");
});


// ================== VIEW ALL BOOKS ==================
app.get("/all", async (req, res) => {
  const books = await Book.find();

  let html = `
  <h2>Book List</h2>
  <table border="1" cellpadding="10">
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Price</th>
      <th>Genre</th>
    </tr>
  `;

  books.forEach(b => {
    html += `
      <tr>
        <td>${b.title}</td>
        <td>${b.author}</td>
        <td>${b.price}</td>
        <td>${b.genre}</td>
      </tr>
    `;
  });

  html += "</table>";

  res.send(html);
});


// ================== UPDATE BOOK ==================
app.get("/update/:title", async (req, res) => {
  await Book.updateOne(
    { title: req.params.title },
    { price: 599, genre: "Updated Genre" }
  );

  res.send("Book Updated");
});


// ================== DELETE BOOK ==================
app.get("/delete/:title", async (req, res) => {
  await Book.deleteOne({ title: req.params.title });

  res.send("Book Deleted");
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});