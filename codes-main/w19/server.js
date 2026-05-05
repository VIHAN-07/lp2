const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB
mongoose.connect("mongodb://127.0.0.1:27017/student")
  .then(() => console.log("✅ Connected"))
  .catch(err => console.log(err));

// SCHEMA
const Student = mongoose.model("studentmarks", new mongoose.Schema({
  Name:        String,
  Roll_No:     Number,
  WAD_Marks:   Number,
  CC_Marks:    Number,
  DSBDA_Marks: Number,
  CNS_Marks:   Number,
  AI_marks:    Number
}));

// SEED
async function seed() {
  if (await Student.countDocuments() === 0) {
    await Student.insertMany([
      { Name: "Neha", Roll_No: 2, WAD_Marks: 45, CC_Marks: 42, DSBDA_Marks: 48, CNS_Marks: 46, AI_marks: 50 },
      { Name: "Sara", Roll_No: 4, WAD_Marks: 45, CC_Marks: 44, DSBDA_Marks: 46, CNS_Marks: 43, AI_marks: 47 },
      { Name: "Amit", Roll_No: 1, WAD_Marks: 25, CC_Marks: 28, DSBDA_Marks: 30, CNS_Marks: 27, AI_marks: 29 }
    ]);
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
    input { padding:8px; margin:5px; width:200px; }
  </style></head>
  <body><h1>${title}</h1><a href="/">🏠 Home</a><br><br>${body}</body></html>`;
}

// TABLE
function table(data) {
  if (!data.length) return "<p>No data found</p>";

  const rows = data.map(s => `
    <tr>
      <td>${s.Name}</td>
      <td>${s.Roll_No}</td>
      <td>${s.WAD_Marks}</td>
      <td>${s.CC_Marks}</td>
      <td>${s.DSBDA_Marks}</td>
      <td>${s.CNS_Marks}</td>
      <td>${s.AI_marks}</td>
      <td>
        <a href="/delete/${encodeURIComponent(s.Name)}">Delete</a>
      </td>
    </tr>`).join("");

  return `<table>
    <tr><th>Name</th><th>Roll</th><th>WAD</th><th>CC</th>
        <th>DSBDA</th><th>CNS</th><th>AI</th><th>Action</th></tr>
    ${rows}
  </table>`;
}

// HOME
app.get("/", (req, res) => {
  res.send(page("Student DB", `
    <a href="/students">All Students</a>
    <a href="/add">Add Student</a>
    <a href="/count">Count</a>
    <a href="/dsbda">DSBDA > 20</a>
    <a href="/allabove25">All > 25</a>
    <a href="/fail">WAD & CC < 40</a>

    <h3>Update +10</h3>
    <form method="POST" action="/update">
      <input name="name" placeholder="Student Name" required>
      <button>Update</button>
    </form>
  `));
});

// VIEW ALL
app.get("/students", async (req, res) => {
  const data = await Student.find();
  res.send(page("All Students", table(data)));
});

// COUNT
app.get("/count", async (req, res) => {
  const count = await Student.countDocuments();
  res.send(page("Count", `<h2>Total Students: ${count}</h2>`));
});

// ADD - form
app.get("/add", (req, res) => {
  res.send(page("Add Student", `
    <form method="POST" action="/add">
      <input name="Name" placeholder="Name" required><br>
      <input name="Roll_No" type="number" placeholder="Roll No" required><br>
      <input name="WAD_Marks" type="number" placeholder="WAD" required><br>
      <input name="CC_Marks" type="number" placeholder="CC" required><br>
      <input name="DSBDA_Marks" type="number" placeholder="DSBDA" required><br>
      <input name="CNS_Marks" type="number" placeholder="CNS" required><br>
      <input name="AI_marks" type="number" placeholder="AI" required><br>
      <button>Add Student</button>
    </form>
  `));
});

// ADD - save
app.post("/add", async (req, res) => {
  await Student.create(req.body);

  res.send(page("Done", `<p style="color:green">✅ Student Added</p>`));
});

// e) DSBDA > 20
app.get("/dsbda", async (req, res) => {
  const data = await Student.find({ DSBDA_Marks: { $gt: 20 } });
  res.send(page("DSBDA > 20", table(data)));
});

// g) ALL > 25
app.get("/allabove25", async (req, res) => {
  const data = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_marks: { $gt: 25 }
  });
  res.send(page("All > 25", table(data)));
});

// h) WAD & CC < 40
app.get("/fail", async (req, res) => {
  const data = await Student.find({
    WAD_Marks: { $lt: 40 },
    CC_Marks: { $lt: 40 }
  });
  res.send(page("Fail Case", table(data)));
});

// f) UPDATE +10
app.post("/update", async (req, res) => {
  await Student.updateOne(
    { Name: req.body.name },
    {
      $inc: {
        WAD_Marks: 10,
        CC_Marks: 10,
        DSBDA_Marks: 10,
        CNS_Marks: 10,
        AI_marks: 10
      }
    }
  );
  res.send(page("Done", `<p style="color:green">✅ Marks Updated</p>`));
});

// i) DELETE
app.get("/delete/:name", async (req, res) => {
  await Student.deleteOne({ Name: req.params.name });
  res.send(page("Done", `<p style="color:green">✅ Deleted</p>`));
});

// START
app.listen(3000, () => console.log("🚀 http://localhost:3000"));