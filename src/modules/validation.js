'use strict';

import {addError} from './errors.js';
import {Messages} from '../constants/constants.js';
import Ajax from './ajax.js';
import {basePageRender} from '../basePage/basePage.js';

/**
 * Функция, осуществляющая валидацию входа пользователя.
 * {return}
 */
export function validateLoginPage() {
	const inpLogin = document.getElementById('input_login').value;
	const inpPass = document.getElementById('input_pass').value;
	if (inpLogin.length < 6) {
		addError(Messages['shortLogin']);
		return false;
	};
	if (inpPass.length < 6) {
		addError(Messages['shortPassword']);
		return false;
	};
	Ajax.post({url: '/login', opt: JSON.stringify({Username: inpLogin, Password: inpPass})})
		.then((r) => {
			if (r.status === 401) {
				addError(Messages['notLogin']);
			}
			if (r.status === 200) {
				aj.get({url: ''})
					.then((r) => {
					console.log(r.status);
					if (r.status === 200) {
						console.log(r);
						basePageRender(r.responseText);
					}})
					.catch((er) => {
						console.error('error');
					});
			};
		})
		.catch((er) => {
			console.error('error');
		});
};

/**
 * Функция, осуществляющая валидацию регистрации пользователя.
 */
export function validateSignUpPage() {
	const inpLogin = document.getElementById('input_login').value;
	const inpPass = document.getElementById('input_pass').value;
	const inpPassRep = document.getElementById('input_pass_rep').value;
	if (inpLogin.length <= 6) {
		addError(Messages['shortLogin']);
	};
	if (inpPass.length <= 6) {
		addError(Messages['shortPassword']);
	};
	if (inpPass !== inpPassRep) {
		addError(Messages['repeatPassword']);
	};
	Ajax.post({url: '/register', opt: JSON.stringify({Username: inpLogin, Password: inpPass})})
		.then((r) => {
			if (r.status === 409) {
				console.log(r.status);
				addError(Messages['alreadyRegister']);
			}
			if (r.status === 201) {
				Ajax.get({url: ''})
					.then((r) => {
					console.log(r.status);
					if (r.status === 200) {
						console.log(r);
						basePageRender(r.responseText);
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
};
