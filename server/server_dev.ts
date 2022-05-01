'use strict';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'http' or its corresponding typ... Remove this comment to see the full error message
import {createServer} from 'http';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'fs' or its corresponding type ... Remove this comment to see the full error message
import {readFile} from 'fs';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'path' or its corresponding typ... Remove this comment to see the full error message
import {resolve} from 'path';

/* Порт, на котором разворачиваемся */
const SERVER_PORT = 3000;

/* Получение текущей директории */
const __dirname = resolve();

/* Обработка запросов */
const server = createServer((req, res) => {
	/* Получение урла */
	const {url} = req;

	/* По дефолту будем отдавать index.html */
	let fileName = 'index_dev.html';

	/* Если не заданные урлы, то придется отдать нужный файли */
	if (!req.headers.accept?.includes('text/html')) {
		fileName = url;
	}


	/* Определение расширения файла */
	fileName = fileName.split('?')[0];
	const extension = fileName.split('.').pop();

	if (extension === 'webp') {
		readFile(`${__dirname}/../../backend${fileName}`, (err, file) => {
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
		readFile(`${__dirname}/../src/${fileName}`, (err, file) => {
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
