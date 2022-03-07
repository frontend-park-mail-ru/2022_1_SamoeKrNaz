'use strict';

import {createServer} from 'http';
import {readFile} from 'fs';
import {resolve}  from 'path';

const SERVER_PORT = 3000;

const __dirname = resolve();

const server = createServer((req, res) => {
    const {url} = req;

    let fileName = 'index.html';
    if (url !== '/login' && url !== '/signup' && url !== '/base' && url !== '/') {
        fileName = url;
    }
    console.log('write: ', fileName);
    const extension = fileName.split('.').pop()

    readFile(`${__dirname}/../src/${fileName}`, (err, file) => {
        if (err) {
            console.error('error');
            res.write('404 not found');
            res.end();
            return;
        };
        if (extension === 'js') {
            res.setHeader('Content-type', 'text/javascript')
        };
        res.write(file);
        res.end();
    });
});

server.listen(SERVER_PORT)
