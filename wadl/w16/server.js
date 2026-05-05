const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath = "." + (req.url === "/" ? "/index.html" : req.url);

  let extname = path.extname(filePath);

  let contentType = "text/html";

  if (extname === ".css") contentType = "text/css";
  if (extname === ".js") contentType = "text/javascript";
  if (extname === ".jpg") contentType = "image/jpeg";
  if (extname === ".png") contentType = "image/png";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("File Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});