const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Define the Employee Schema
const employeeSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Department: { type: String, required: true },
    Designation: { type: String, required: true },
    Salary: { type: Number, required: true, min: 0 },
    JoiningDate: { type: Date, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

// Serve the frontend HTML file
app.get('/', (req, res) => {
    // Using path.join so it works regardless of your specific folder structure
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Optional: Seed initial data if the database is empty (similar to your addStudents function)
addInitialEmployees();
async function addInitialEmployees() {
    try {
        const count = await Employee.countDocuments();
        if (count === 0) {
            await Employee.insertMany([
                { Name: "Advait", Department: "IT", Designation: "Software Engineer", Salary: 75000, JoiningDate: "2023-01-15" },
                { Name: "Aditi", Department: "HR", Designation: "HR Manager", Salary: 65000, JoiningDate: "2022-05-20" }
            ]);
            console.log("Initial employee data loaded");
        }
    } catch (err) {
        console.log(err);
    }
}

// 1. View all employee records
app.get('/getEmployees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching employees");
    }
});

// 2. Add a new employee
app.post('/addEmployee', async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body);
        res.json(newEmployee);
    } catch (err) {
        console.log(err);
        res.status(400).send("Error adding employee");
    }
});

// 3. Update an existing employee's details
app.put('/updateEmployee/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Returns the updated document
        );
        res.json(updatedEmployee);
    } catch (err) {
        console.log(err);
        res.status(400).send("Error updating employee");
    }
});

// 4. Delete an employee record
app.delete('/deleteEmployee/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        res.json(deletedEmployee);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting employee");
    }
});

app.listen(3000, () => {
    console.log("Server Running on http://localhost:3000");
});