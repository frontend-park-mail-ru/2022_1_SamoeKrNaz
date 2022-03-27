'use strict';

import {loginPageRender} from '../loginPage/loginPage.js';
import {basePageRender} from '../basePage/basePage.js';
import {signupPageRender} from '../signupPage/signupPage.js';
import Ajax from '../modules/ajax.js';
import {domainSize, Url} from '../constants/constants.js';
import router from '../modules/router.js';

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

router.register(Url.index, loginPageRender);
router.register(Url.basePage, basePageRender);
router.register(Url.loginPage, loginPageRender);
router.register(Url.signupPage, signupPageRender);

/* Обработка текущего урла и переход по страницам в зависимости от куки */
if (getUrl === 'login') {
	Ajax.get({url: ''})
		.then((r) => {
			if (r.status == 401) {
				router.open(Url.loginPage);
			}
			if (r.status === 200) {
				router.open(Url.basePage, r.responseText);
			};
		})
		.catch((er) => {
			console.error('error');
		});
} else if (getUrl === 'signup') {
	Ajax.get({url: ''})
		.then((r) => {
			if (r.status == 401) {
				router.open(Url.signupPage);
			}
			if (r.status === 200) {
				router.open(Url.basePage, r.responseText);
			};
		})
		.catch((er) => {
			console.error('error');
		});
} else if (getUrl === 'base' || getUrl === '') {
	Ajax.get({url: ''})
		.then((r) => {
			if (r.status === 401) {
				router.open(Url.loginPage);
			}
			if (r.status === 200) {
				Ajax.get({url: ''})
					.then((r) => {
						if (r.status === 200) {
							router.open(Url.basePage, r.responseText);
						}
					})
					.catch((er) =>{
						console.error('error');
					});
			};
		})
		.catch((er) => {
			console.error('error');
		});
}
