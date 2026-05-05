const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/employees")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// SCHEMA
const empSchema = new mongoose.Schema({
  name: String,
  department: String,
  designation: String,
  salary: Number,
  joining_date: String
});

const Employee = mongoose.model("Employee", empSchema);


// ================== CREATE ==================
app.get("/add", async (req, res) => {
  await Employee.create({
    name: "Manas",
    department: "IT",
    designation: "Developer",
    salary: 50000,
    joining_date: "2024-01-01"
  });

  res.send("Employee Added");
});


// ================== READ ==================
app.get("/all", async (req, res) => {
  const employees = await Employee.find();

  let html = `
  <h2>Employee Records</h2>
  <table border="1" cellpadding="10">
    <tr>
      <th>Name</th>
      <th>Department</th>
      <th>Designation</th>
      <th>Salary</th>
      <th>Joining Date</th>
    </tr>
  `;

  employees.forEach(e => {
    html += `
      <tr>
        <td>${e.name}</td>
        <td>${e.department}</td>
        <td>${e.designation}</td>
        <td>${e.salary}</td>
        <td>${e.joining_date}</td>
      </tr>
    `;
  });

  html += "</table>";

  res.send(html);
});


// ================== UPDATE ==================
app.get("/update/:name", async (req, res) => {
  await Employee.updateOne(
    { name: req.params.name },
    { salary: 70000, designation: "Senior Developer" }
  );

  res.send("Employee Updated");
});


// ================== DELETE ==================
app.get("/delete/:name", async (req, res) => {
  await Employee.deleteOne({ name: req.params.name });

  res.send("Employee Deleted");
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});