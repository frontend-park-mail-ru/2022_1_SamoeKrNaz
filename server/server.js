'use strict';

import {createServer} from 'http';
import {readFile} from 'fs';
import {resolve}  from 'path';

const SERVER_PORT = 3000;

const __dirname = resolve();

const server = createServer((req, res) => {
    const {url} = req;
    console.log('request', url);

    let fileName = url === '/' ? 'login.html' : url;

    const extension = fileName.split('.').pop()
    if (extension === 'js') {
        fileName.concat('js/');
    } else if (extension === 'css') {
        fileName.concat('css/');
    }
    readFile(`${__dirname}/../src/${fileName}`, (err, file) => {
        if (err) {
            console.error('error');
            res.write('404 not found');
            res.end();
            return;
        }
        if (extension === 'js') {
            res.setHeader('Content-type', 'text/javascript')
        };
        res.write(file);
        res.end();
    });
});

server.listen(SERVER_PORT)
