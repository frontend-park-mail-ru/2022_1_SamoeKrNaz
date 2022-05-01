'use strict';


// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const http = require('http');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const fs = require('fs');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
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
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
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
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
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
