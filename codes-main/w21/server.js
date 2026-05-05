const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB
mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
  .then(() => console.log("✅ Connected"))
  .catch(err => console.log(err));

// SCHEMA
const Book = mongoose.model("books", new mongoose.Schema({
  title:  String,
  author: String,
  price:  Number,
  genre:  String
}));

// SEED
async function seed() {
  if (await Book.countDocuments() === 0) {
    await Book.insertMany([
      { title: "The Alchemist", author: "Paulo Coelho", price: 299, genre: "Fiction" },
      { title: "Atomic Habits", author: "James Clear",  price: 499, genre: "Non-Fiction" }
    ]);
    console.log("📚 Sample data inserted");
  }
}
seed();

// HTML WRAPPER
function page(title, body) {
  return `<html><head><title>${title}</title>
  <style>
    body { font-family:Arial; padding:20px; background:#f4f4f4; }
    a,button { padding:8px 12px; margin:5px; background:#222; color:white;
               text-decoration:none; border-radius:5px; border:none; cursor:pointer; }
    table { width:100%; border-collapse:collapse; background:white; }
    th,td { padding:10px; border:1px solid #ddd; text-align:center; }
    th { background:#333; color:white; }
    input,select { padding:8px; margin:5px; width:200px; }
  </style></head>
  <body><h1>${title}</h1><a href="/">🏠 Home</a><br><br>${body}</body></html>`;
}

// TABLE HELPER
function table(data) {
  if (!data.length) return "<p>No data found</p>";

  const rows = data.map(b => `
    <tr>
      <td>${b.title}</td>
      <td>${b.author}</td>
      <td>${b.price}</td>
      <td>${b.genre}</td>
      <td>
        <a href="/delete/${encodeURIComponent(b.title)}">Delete</a>
        <a href="/update/${encodeURIComponent(b.title)}">Update</a>
      </td>
    </tr>`).join("");

  return `<table>
    <tr><th>Title</th><th>Author</th><th>Price</th><th>Genre</th><th>Action</th></tr>
    ${rows}
  </table>`;
}

// HOME
app.get("/", (req, res) => {
  res.send(page("Bookstore", `
    <a href="/books">All Books</a>
    <a href="/add">Add Book</a>
    <a href="/count">Count</a>
  `));
});

// VIEW ALL
app.get("/books", async (req, res) => {
  const data = await Book.find();
  res.send(page("All Books", table(data)));
});

// COUNT
app.get("/count", async (req, res) => {
  const count = await Book.countDocuments();
  res.send(page("Count", `<h2>Total Books: ${count}</h2>`));
});

// ADD - form
app.get("/add", (req, res) => {
  res.send(page("Add Book", `
    <form method="POST" action="/add">
      <input name="title"  placeholder="Title" required><br>
      <input name="author" placeholder="Author" required><br>
      <input name="price"  type="number" placeholder="Price" required><br>
      <select name="genre" required>
        <option value="">Genre</option>
        <option>Fiction</option>
        <option>Non-Fiction</option>
        <option>Science</option>
        <option>Technology</option>
      </select><br>
      <button>Add Book</button>
    </form>`));
});

// ADD - save
app.post("/add", async (req, res) => {
  await Book.create(req.body);
  res.send(page("Done", `<p style="color:green">✅ Book Added</p>`));
});

// DELETE (by title like music code)
app.get("/delete/:name", async (req, res) => {
  await Book.deleteOne({ title: req.params.name });
  res.send(page("Done", `<p style="color:green">✅ Deleted</p>`));
});

// UPDATE - form
app.get("/update/:name", (req, res) => {
  res.send(page("Update Book", `
    <form method="POST" action="/update/${req.params.name}">
      <input name="price" type="number" placeholder="New Price" required><br>
      <button>Update</button>
    </form>`));
});

// UPDATE - save
app.post("/update/:name", async (req, res) => {
  await Book.updateOne(
    { title: req.params.name },
    { $set: req.body} 
  );
  res.send(page("Done", `<p style="color:green">✅ Updated</p>`));
});

// START
app.listen(3000, () => console.log("🚀 http://localhost:3000"));