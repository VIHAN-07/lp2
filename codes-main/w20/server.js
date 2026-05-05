const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB
mongoose.connect("mongodb://127.0.0.1:27017/employee")
  .then(() => console.log("✅ Connected"))
  .catch(err => console.log(err));

// SCHEMA
const Employee = mongoose.model("employees", new mongoose.Schema({
  name: String,
  department: String,
  designation: String,
  salary: Number,
  joiningDate: String
}));

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
    input { padding:8px; margin:5px; width:200px; }
  </style></head>
  <body><h1>${title}</h1><a href="/">🏠 Home</a><br><br>${body}</body></html>`;
}

// TABLE HELPER
function table(data) {
  if (!data.length) return "<p>No data found</p>";

  const rows = data.map(e => `
    <tr>
      <td>${e.name}</td>
      <td>${e.department}</td>
      <td>${e.designation}</td>
      <td>${e.salary}</td>
      <td>${e.joiningDate}</td>
      <td>
        <a href="/delete/${encodeURIComponent(e.name)}">Delete</a>
        <a href="/update/${encodeURIComponent(e.name)}">Update</a>
      </td>
    </tr>`).join("");

  return `<table>
    <tr><th>Name</th><th>Dept</th><th>Designation</th>
        <th>Salary</th><th>Joining Date</th><th>Action</th></tr>
    ${rows}
  </table>`;
}

// HOME
app.get("/", (req, res) => {
  res.send(page("Employee DB", `
    <a href="/employees">View Employees</a>
    <a href="/add">Add Employee</a>
  `));
});

// VIEW ALL
app.get("/employees", async (req, res) => {
  const data = await Employee.find();
  res.send(page("All Employees", table(data)));
});

// ADD - form
app.get("/add", (req, res) => {
  res.send(page("Add Employee", `
    <form method="POST" action="/add">
      <input name="name" placeholder="Name" required><br>
      <input name="department" placeholder="Department" required><br>
      <input name="designation" placeholder="Designation" required><br>
      <input name="salary" type="number" placeholder="Salary" required><br>
      <input name="joiningDate" type="date" required><br>
      <button>Add Employee</button>
    </form>`));
});

// ADD - save
app.post("/add", async (req, res) => {
  // await Employee.create({
  //   ...req.body,
  //   salary: Number(req.body.salary)
  // });

  await Employee.create(req.body);
  res.send(page("Done", `<p style="color:green">✅ Employee Added</p>`));
});

// DELETE
app.get("/delete/:name", async (req, res) => {
  await Employee.deleteOne({ name: req.params.name });
  res.send(page("Done", `<p style="color:green">✅ Deleted</p>`));
});

// UPDATE - form
app.get("/update/:name", (req, res) => {
  res.send(page("Update Employee", `
    <form method="POST" action="/update/${req.params.name}">
      <input name="salary" type="number" placeholder="New Salary" required>
      <button>Update</button>
    </form>`));
});

// UPDATE - save
app.post("/update/:name", async (req, res) => {
  await Employee.updateOne(
    { name: req.params.name },
    // { $set: { salary: Number(req.body.salary) } }
    {$set:req.body}
  );
  res.send(page("Done", `<p style="color:green">✅ Salary Updated</p>`));
});

// START
app.listen(3000, () => console.log("🚀 http://localhost:3000"));