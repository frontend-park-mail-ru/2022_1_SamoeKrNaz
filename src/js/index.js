'use strict';

import {loginPageRender} from '../loginPage/loginPage.js';
import {basePageRender} from '../basePage/basePage.js';
import {signupPageRender} from '../signupPage/signupPage.js';
import Ajax from '../modules/ajax.js';
import {domainSize} from '../constants/constants.js';

/* Структура для вызова методов в зависимости от урла */
const configApp = {
	signup: {
		href: '/signup',
		openMethod: signupPageRender,
	},
	login: {
		href: '/login',
		openMethod: loginPageRender,
	},
	base: {
		href: '/base',
		openMethod: basePageRender,
	},
};

/* Получение текущего адреса без домена */
const getUrl = window.location.href.slice(domainSize);

/* Обработка текущего урла и переход по страницам в зависимости от куки */
if (getUrl === 'login') {
	Ajax.get({url: ''})
		.then((r) => {
			if (r.status == 401) {
				loginPageRender();
			}
			if (r.status === 200) {
				window.history.pushState('', '', 'http://89.208.199.114:3000/base');
				basePageRender(r.responseText);
			};
		})
		.catch((er) => {
			console.error(er);
		});
} else if (getUrl === 'signup') {
	Ajax.get({url: ''})
		.then((r) => {
			if (r.status == 401) {
				signupPageRender();
			}
			if (r.status === 200) {
				window.history.pushState('', '', 'http://89.208.199.114:3000/base');
				basePageRender(r.responseText);
			};
		})
		.catch((er) => {
			console.error(er);
		});
} else if (getUrl === 'base' || getUrl === '') {
	Ajax.get({url: ''})
		.then((r) => {
			if (r.status === 401) {
				loginPageRender();
				window.history.pushState('', '', 'http://89.208.199.114:3000/login');
			}
			if (r.status === 200) {
				Ajax.get({url: ''})
					.then((r) => {
					console.log(r.status);
					if (r.status === 200) {
						console.log(r);
						basePageRender(r.responseText);
					}})
					.catch((er) =>{
						console.error(er);
					});
			};
		})
		.catch((er) => {
			console.error(er);
		});
}

/* Навешивание обработки на все ссылки в боди */
document.body.addEventListener('click', (e) => {
	const {target} = e;
	if (target instanceof HTMLAnchorElement) {
		e.preventDefault();
		const section = target.href.slice(domainSize);
		if (section) {
			window.history.pushState('', '', section);
			configApp[section].openMethod();
		}
	}
});
