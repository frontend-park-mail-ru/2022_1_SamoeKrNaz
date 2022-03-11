'use strict';

const http = require('http');
const fs = require('fs');

/* Порт, на котором разворачиваемся */
const SERVER_PORT = 80;

/* Обработка запросов */
try {
	const server = http.createServer((req, res) => {
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

		fs.readFile(`${__dirname}/../src/${fileName}`, (err, file) => {
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
} catch (e) {
	fs.writeFile(`${__dirname}/log.txt`, e, (err) => {
		if (err) {
			console.error(err);
		}
	});
}

