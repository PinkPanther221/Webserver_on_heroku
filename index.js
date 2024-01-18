const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // if (req.url === '/' ) {
    //     fs.readFile(path.join(__dirname, 'index.html'), (err,data)=>{
    //         if (err) throw err;
    //         res.writeHead(200, {'Content-Type':'text/html'});
    //         res.end(data);
    //     });
    // }

    // if (req.url === '/api/users' ) {
    //     const users = [
    //         {name: 'BOB SMITH', age:40},
    //         {name: 'JOHN DOE', age:43},
    //     ];
    //     res.writeHead(200, {'Content-Type':'application/json'});
    //     res.end(JSON.stringify(users));
    // }
    //Build file path
    let filePath = path.join(
        __dirname, req.url === '/'?'index.html':req.url);

    //Extension of file
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    //Check ext and content type
    //Read File
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if(err.code === 'ENOENT'){
                //Page not found
                fs.readFile(path.join(__dirname, '404.html'), (err, content) =>{
                    res.writeHead(200, {'Content-Type':'text/html'});
                    res.end(content, 'utf8');
                });
            } else {
                //Some Server Error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(content, 'utf8');
        }
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));