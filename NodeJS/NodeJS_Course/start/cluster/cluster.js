const cluster = require("node:cluster");
const http = require("node:http");
const OS = require("node:os");

console.log(OS.cpus().length);

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);
    cluster.fork();
    cluster.fork();
} else {
    console.log(`Worker process ${process.pid} started`);

    const server = http.createServer((req, res) => {
        if (req.url === '/') {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.end("Home page");
    } else if (req.url === '/slow-page') {
        for (let i = 0; i < 6000000000; i++) {}
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.end("Slow page");
    }
    });
    const PORT = 8000;
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}