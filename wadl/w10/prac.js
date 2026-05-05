const http = require("http");
const fs = require("fs");

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/api/todos") {
        // Handle GET request for todos
        fs.readFile("todos.json", (err, data) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
        });
    }

    else if (req.method === "POST" && req.url === "/api/todos") {
        // Handle POST request to add a new todo
        let body = "";

        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const newTodo = JSON.parse(body);
            fs.readFile("todos.json", (err, data) => {
                let todos = JSON.parse(data);
                newTodo.id = Date.now();
                todos.push(newTodo);
                fs.writeFile("todos.json", JSON.stringify(todos), () => {
                    res.writeHead(200);
                    res.end("Added");
                });
            });
        });
    }

    else if (req.method === "DELETE") {
        // Handle DELETE request to remove a todo
        const id = parseInt(req.url.split("/")[3]);
        fs.readFile("todos.json", (err, data) => {
            let todos = JSON.parse(data);
            todos = todos.filter(t => t.id !== id);
            fs.writeFile("todos.json", JSON.stringify(todos), () => {
                res.writeHead(200);
                res.end("Deleted");
            });
        });
    }

    else if (req.method === "PUT") {
        // Handle PUT request to update or toggle a todo
        const id = parseInt(req.url.split("/")[3]);
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const updatedTodo = JSON.parse(body);
            fs.readFile("todos.json", (err, data) => {
                let todos = JSON.parse(data);

                todos = todos.map(t => {
                    if (t.id === id) {
                        return {
                            ...t,
                            task: updated.task ?? t.task,
                            completed: updated.toggle ? !t.completed : t.completed
                        };
                    }
                    return t;
                });

                fs.writeFile("todos.json", JSON.stringify(todos), () => {
                    res.writeHead(200);
                    res.end("Updated");
                });
            });
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