'use strict';

import {validateLoginPage, validateSignUpPage} from '../modules/validation.js';
import * as render from './loginPage.templ.js';
import {deleteListeners} from '../modules/deleteEventListeners.js';

/**
 * Функция, осуществляющая рендер страницы логина.
 */
export function loginPageRender() {
	/* Удаляем обработчики событий для всех используемых элементов */
	deleteListeners();
	/* Регистрация всех компонентов для страницы */
	Handlebars.registerPartial('button', Handlebars.templates['button']);
	Handlebars.registerPartial('decoration', Handlebars.templates['decoration']);
	Handlebars.registerPartial('descp', Handlebars.templates['descp']);
	Handlebars.registerPartial('error', Handlebars.templates['error']);
	Handlebars.registerPartial('headTitle', Handlebars.templates['headTitle']);
	Handlebars.registerPartial('input', Handlebars.templates['input']);
	Handlebars.registerPartial('logo', Handlebars.templates['logo']);

	/* Смена урла в адресной строке */
	window.history.pushState('', '', 'http://89.208.199.114:3000/login');

	/* Рендер шаблона с входными данными */
	const loginPage = Handlebars.templates.loginPage;
	const html = loginPage({});

	/* Создание контейнера для вставки в DOM */
	document.body.innerHTML ='';
	const container = document.createElement('div');
	container.className = 'container';
	document.body.appendChild(container);
	document.getElementsByClassName('container')[0].innerHTML += html;

	/* Навешивание обработчика валидации данных для формы логина */
	const form = document.getElementById('input_form');
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		validateLoginPage();
	});
};
