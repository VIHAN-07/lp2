const http = require("http");
const fs = require("fs");

const PORT = 3000;

const server = http.createServer((req, res) => {

  if (req.url === "/api/employees") {
    fs.readFile("employees.json", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading data");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });
  }

  else if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  }

  else {
    res.writeHead(404);
    res.end("Not Found");
  }

});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});