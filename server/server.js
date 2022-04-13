'use strict';


const http = require('http');
const fs = require('fs');
const path = require('path');

/* Порт, на котором разворачиваемся */
const SERVER_PORT = 3000;

/* Обработка запросов */
const server = http.createServer((req, res) => {
	/* Получение урла */
	const {url} = req;

	/* По дефолту будем отдавать index.html */
	let fileName = 'index.html';

	/* Если не заданные урлы, то придется отдать нужный файли */
	if (!req.headers.accept?.includes('text/html')) {
		fileName = url;
	}


	/* Определение расширения файла */
	fileName = fileName.split('?')[0];
	const extension = fileName.split('.').pop();

	if (extension === 'webp') {
		fs.readFile(`${__dirname}/../../backend${fileName}`, (err, file) => {
			/* Обработка ошибки*/
			if (err) {
				res.write('404 not found');
				res.end();
				return;
			}

			/* Запись данных*/
			res.write(file);
			res.end();
		});
	} else {
		fs.readFile(`${__dirname}/../src/${fileName}`, (err, file) => {
		/* Обработка ошибки*/
			if (err) {
				res.write('404 not found');
				res.end();
				return;
			}

			/* При расширении .js необходимо установить заголовок */
			if (extension === 'js') {
				res.setHeader('Content-type', 'text/javascript');
			}

			/* Запись данных*/
			res.write(file);
			res.end();
		});
	}
});

/* Прослушивание порта*/
server.listen(SERVER_PORT);
