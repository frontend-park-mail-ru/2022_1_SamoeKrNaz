'use strict';

import {loginPageRender} from '../loginPage/loginPage.js';
import {basePageRender} from '../basePage/basePage.js';
import {signupPageRender} from '../signupPage/signupPage.js';
import Ajax from '../modules/ajax.js';
import {domainSize, frontendUrl, Url} from '../constants/constants.js';
import router from '../modules/router.js';
import {boardPageRender} from '../boardPage/boardPage.js';

/* Получение текущего адреса без домена */
const getUrl = window.location.href.replace(frontendUrl, '');

router.register(Url.index, loginPageRender);
router.register(Url.base, basePageRender);
router.register(Url.login, loginPageRender);
router.register(Url.signup, signupPageRender);
router.register(Url.board, boardPageRender);

/* Обработка текущего урла и переход по страницам в зависимости от куки */
if (getUrl === 'login') {
	// Ajax.get({url: ''})
	// 	.then((r) => {
	// 		if (r.status == 401) {
	// 			router.open(Url.loginPage);
	// 		}
	// 		if (r.status === 200) {
	// 			router.open(Url.basePage, r.responseText);
	// 		};
	// 	})
	// 	.catch((er) => {
	// 		console.error('error');
	// 	});
	router.open(Url.loginPage);
} else if (getUrl === 'signup') {
	// Ajax.get({url: ''})
	// 	.then((r) => {
	// 		if (r.status == 401) {
	// 			router.open(Url.signupPage);
	// 		}
	// 		if (r.status === 200) {
	// 			router.open(Url.basePage, r.responseText);
	// 		};
	// 	})
	// 	.catch((er) => {
	// 		console.error('error');
	// 	});
	router.open(Url.signupPage);
} else if (getUrl === 'base' || getUrl === '') {
	// Ajax.get({url: ''})
	// 	.then((r) => {
	// 		if (r.status === 401) {
	// 			router.open(Url.loginPage);
	// 		}
	// 		if (r.status === 200) {
	// 			Ajax.get({url: ''})
	// 				.then((r) => {
	// 					if (r.status === 200) {
	// 						router.open(Url.basePage, r.responseText);
	// 					}
	// 				})
	// 				.catch((er) =>{
	// 					console.error('error');
	// 				});
	// 		};
	// 	})
	// 	.catch((er) => {
	// 		console.error('error');
	// 	});
	router.open(Url.basePage);
}
