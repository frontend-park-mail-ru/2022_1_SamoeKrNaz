const http = require('http')
const fs = require('fs')
const path = require('path')

const SERVER_PORT = 3000


const server = http.createServer((req, res) => {
    const {url} = req;
    console.log('request', url);

    const fileName = url === '/' ? 'index.html' : url;

    const extension = fileName.split('.').pop()
    let fileDir = 'template'
    if (extension == 'js') {
        fileDir = 'js'
    } else if (extension == 'css') {
        fileDir = 'css'
    }
    fs.readFile(`${__dirname}/../src/${fileDir}/${fileName}`, (err, file) => {
        if (err) {
            console.log('error');
            res.write('404 not found');
            res.write(`${__dirname}`);
            res.end();
            return;
        }

        res.write(file)
        res.end();
    });
});

server.listen(SERVER_PORT)
