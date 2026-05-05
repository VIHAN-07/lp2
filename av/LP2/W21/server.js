const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bookstoreDB')
    .then(() => console.log('Connected to MongoDB: bookstoreDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the Book Schema
const bookSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Author: { type: String, required: true },
    Price: { type: Number, required: true, min: 0 },
    Genre: { type: String, required: true }
});

// Create the Book Model
const Book = mongoose.model('Book', bookSchema);

// Serve the frontend HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Seed initial data if the database is empty (optional, for easy testing)
seedBooks();
async function seedBooks() {
    try {
        const count = await Book.countDocuments();
        if (count === 0) {
            await Book.insertMany([
                { Title: "The Great Gatsby", Author: "F. Scott Fitzgerald", Price: 10.99, Genre: "Classic" },
                { Title: "Dune", Author: "Frank Herbert", Price: 15.50, Genre: "Science Fiction" },
                { Title: "The Hobbit", Author: "J.R.R. Tolkien", Price: 12.00, Genre: "Fantasy" }
            ]);
            console.log("Initial book data loaded");
        }
    } catch (err) {
        console.error("Error seeding data:", err);
    }
}

// ==========================================
// CRUD API Routes
// ==========================================

// 1. Retrieve a list of all books
app.get('/getBooks', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving books");
    }
});

// 2. Add a new book
app.post('/addBook', async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error adding book");
    }
});

// 3. Update book details
app.put('/updateBook/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Returns the updated document instead of the old one
        );
        res.json(updatedBook);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error updating book");
    }
});

// 4. Delete a book from the collection
app.delete('/deleteBook/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        res.json(deletedBook);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting book");
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Bookstore Server running on http://localhost:3000");
});