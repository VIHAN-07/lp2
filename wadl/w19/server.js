const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/student")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// SCHEMA
const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_Marks: Number
});

const Student = mongoose.model("Student", studentSchema);


// c) Insert documents
app.get("/insert", async (req, res) => {
  await Student.deleteMany(); // reset

  const data = [
    { Name: "Manas", Roll_No: 1, WAD_Marks: 25, CC_Marks: 22, DSBDA_Marks: 28, CNS_Marks: 30, AI_Marks: 27 },
    { Name: "Rohit", Roll_No: 2, WAD_Marks: 15, CC_Marks: 18, DSBDA_Marks: 21, CNS_Marks: 19, AI_Marks: 20 },
    { Name: "Sneha", Roll_No: 3, WAD_Marks: 30, CC_Marks: 29, DSBDA_Marks: 32, CNS_Marks: 31, AI_Marks: 30 },
    { Name: "Amit", Roll_No: 4, WAD_Marks: 10, CC_Marks: 12, DSBDA_Marks: 15, CNS_Marks: 14, AI_Marks: 13 },
    { Name: "Priya", Roll_No: 5, WAD_Marks: 26, CC_Marks: 27, DSBDA_Marks: 24, CNS_Marks: 28, AI_Marks: 29 }
  ];

  await Student.insertMany(data);
  res.send("Students Inserted");
});


// d) Count + list all
app.get("/all", async (req, res) => {
  const students = await Student.find();

  let html = `<h2>Total Students: ${students.length}</h2><ul>`;

  students.forEach(s => {
    html += `<li>${s.Name} (Roll: ${s.Roll_No})</li>`;
  });

  html += `</ul>`;
  res.send(html);
});


// e) DSBDA > 20
app.get("/dsbda20", async (req, res) => {
  const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });

  let html = "<h3>Students with DSBDA > 20</h3><ul>";
  students.forEach(s => html += `<li>${s.Name}</li>`);
  html += "</ul>";

  res.send(html);
});


// f) Increase marks by 10 for a student
app.get("/update/:name", async (req, res) => {
  await Student.updateOne(
    { Name: req.params.name },
    {
      $inc: {
        WAD_Marks: 10,
        CC_Marks: 10,
        DSBDA_Marks: 10,
        CNS_Marks: 10,
        AI_Marks: 10
      }
    }
  );

  res.send("Marks Updated");
});


// g) >25 in ALL subjects
app.get("/above25all", async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_Marks: { $gt: 25 }
  });

  let html = "<h3>Students >25 in all subjects</h3><ul>";
  students.forEach(s => html += `<li>${s.Name}</li>`);
  html += "</ul>";

  res.send(html);
});


// h) <40 in Maths & Science (assume WAD=Maths, CNS=Science)
app.get("/less40", async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $lt: 40 },
    CNS_Marks: { $lt: 40 }
  });

  let html = "<h3>Less than 40 in Maths & Science</h3><ul>";
  students.forEach(s => html += `<li>${s.Name}</li>`);
  html += "</ul>";

  res.send(html);
});


// i) Delete student
app.get("/delete/:name", async (req, res) => {
  await Student.deleteOne({ Name: req.params.name });
  res.send("Student Deleted");
});


// j) Table format
app.get("/table", async (req, res) => {
  const students = await Student.find();

  let html = `
  <h2>Student Marks</h2>
  <table border="1" cellpadding="10">
    <tr>
      <th>Name</th>
      <th>Roll</th>
      <th>WAD</th>
      <th>CC</th>
      <th>DSBDA</th>
      <th>CNS</th>
      <th>AI</th>
    </tr>
  `;

  students.forEach(s => {
    html += `
      <tr>
        <td>${s.Name}</td>
        <td>${s.Roll_No}</td>
        <td>${s.WAD_Marks}</td>
        <td>${s.CC_Marks}</td>
        <td>${s.DSBDA_Marks}</td>
        <td>${s.CNS_Marks}</td>
        <td>${s.AI_Marks}</td>
      </tr>
    `;
  });

  html += "</table>";

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});