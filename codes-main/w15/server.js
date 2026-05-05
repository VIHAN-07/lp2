const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {

  // API route
  if (req.url === "/api/products") {
    fs.readFile("./products.json", (err, data) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    });
    return;
  }

  // HTML route
  fs.readFile("./public/index.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });

}).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
