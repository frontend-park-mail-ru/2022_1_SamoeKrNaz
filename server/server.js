"use strict";

import * as http from 'http';
import * as fs from 'fs';
import * as path from "path";

const SERVER_PORT = 3000

const __dirname = path.resolve();


const server = http.createServer((req, res) => {
    const {url} = req;
    console.log('request', url);

    let fileName = url === '/' ? 'login.html' : url;

    const extension = fileName.split('.').pop()
    if (extension === 'js') {
        fileName.concat('js/');
    } else if (extension === 'css') {
        fileName.concat('css/');
    }
    fs.readFile(`${__dirname}/../src/${fileName}`, (err, file) => {
        if (err) {
            console.log('error');
            res.write('404 not found');
            res.end();
            return;
        }
        res.write(file)
        res.end();
    });
});

server.listen(SERVER_PORT)
