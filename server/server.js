'use strict';

import {createServer} from 'http';
import {readFile} from 'fs';
import {resolve}  from 'path';

/* Порт, на котором разворачиваемся */
const SERVER_PORT = 80;

/* Получение текущей директории */
const __dirname = resolve();

/* Обработка запросов */
const server = createServer((req, res) => {
    /* Получение урла */
    const {url} = req;

    /* По дефолту будем отдавать index.html */
    let fileName = 'index.html';

    /* Если не заданные урлы, то придется отдать нужный файли */
    if (url !== '/login' && url !== '/signup' && url !== '/base' && url !== '/') {
        fileName = url;
    }

    /* Определение расширения файла */
    const extension = fileName.split('.').pop();

    readFile(`${__dirname}/../src/${fileName}`, (err, file) => {

        /* Обработка ошибки*/
        if (err) {
            res.write('404 not found');
            res.end();
            return;
        };

        /* При расширении .js необходимо установить заголовок */
        if (extension === 'js') {
            res.setHeader('Content-type', 'text/javascript');
        };

        /* Запись данных*/
        res.write(file);
        res.end();
    });
});

/* Прослушивание порта*/
server.listen(SERVER_PORT);
