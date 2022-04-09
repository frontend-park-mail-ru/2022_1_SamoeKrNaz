'use strict';

import {addError} from './errors.js';
import {Messages, Url} from '../constants/constants.js';
import Ajax from './ajax.js';
import {basePageRender} from '../basePage/basePage.js';
import router from './router.js';

/**
 * Функция, осуществляющая валидацию входа пользователя.
 * @return {boolean} результат валидации
 */
export function validateLoginPage() {
	const inpLogin = document.getElementById('input_login').value;
	const inpPass = document.getElementById('input_pass').value;

	if ((inpLogin.length <= 6 || inpLogin.length > 20) && (inpPass.length <= 6 || inpPass.length > 20)) {
		addError(Messages['shortLoginPassword']);
		return false;
	}
	if (inpLogin.length <= 6 || inpLogin.length > 20) {
		addError(Messages['shortLogin']);
		return false;
	};
	if (inpPass.length <= 6 || inpPass.length > 20) {
		addError(Messages['shortPassword']);
		return false;
	};
	Ajax.post({url: '/login', opt: JSON.stringify({Username: inpLogin, Password: inpPass})})
		.then((r) => {
			if (r.status === 401) {
				addError(Messages['notLogin']);
			}
			if (r.status === 200) {
				Ajax.get({url: ''})
					.then((r) => {
						if (r.status === 200) {
							router.open(Url.basePage, r.responseText);
						}
					})
					.catch((er) => {
						console.error('error');
					});
			};
		})
		.catch((er) => {
			console.error('error');
		});
	return false;
};

/**
 * Функция, осуществляющая валидацию регистрации пользователя.
 * @return {boolean} результат валидации
 */
export function validateSignUpPage() {
	const inpLogin = document.getElementById('input_login').value;
	const inpPass = document.getElementById('input_pass').value;
	const inpPassRep = document.getElementById('input_pass_rep').value;

	if ((inpLogin.length <= 6 || inpLogin.length > 20) && (inpPass.length <= 6 || inpPass.length > 20)) {
		addError(Messages['shortLoginPassword']);
		return false;
	}
	if (inpLogin.length <= 6 || inpLogin.length > 20) {
		addError(Messages['shortLogin']);
		return false;
	}
	if (inpPass.length <= 6 || inpPass.length > 20) {
		addError(Messages['shortPassword']);
		return false;
	}
	if (inpPass !== inpPassRep) {
		addError(Messages['repeatPassword']);
		return false;
	}
	Ajax.post({url: '/register', opt: JSON.stringify({Username: inpLogin, Password: inpPass})})
		.then((r) => {
			if (r.status === 409) {
				addError(Messages['alreadyRegister']);
			}
			if (r.status === 201) {
				Ajax.get({url: ''})
					.then((r) => {
						if (r.status === 200) {
							router.open(Url.basePage, r.responseText);
						}
					})
					.catch((er) => {
						console.error('error');
					});
			}
		})
		.catch((er) => {
			console.error('error');
		});
	return false;
}
