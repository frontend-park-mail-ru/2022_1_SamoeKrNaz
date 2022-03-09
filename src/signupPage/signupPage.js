'use strict';

import * as render from './signupPage.templ.js';
import {validateLoginPage, validateSignUpPage} from '../modules/validation.js';
import {addPrompt, deletePrompt} from '../modules/prompt.js';
import {deleteListeners} from '../modules/deleteEventListeners.js';

/**
 * Функция, осуществляющая рендер страницы регистрации.
 */
export function signupPageRender() {
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
	window.history.pushState('', '', 'http://89.208.199.114:3000/signup');

	/* Рендер шаблона с входными данными */
	const signupPage = Handlebars.templates.signupPage;
	const html = signupPage({});

	/* Создание контейнера для вставки в DOM */
	document.body.innerHTML = '';
	const container = document.createElement('div');
	container.className = 'container';
	document.body.appendChild(container);
	document.getElementsByClassName('container')[0].innerHTML += html;

	/* Навешивание обработчика валидации данных для формы регистрации */
	const form = document.getElementById('input_form');
	form.onsubmit = validateSignUpPage;

	/* Добавление подсказки при вводе пароля */
	const inputPas = document.getElementById('input_pass');
	inputPas.addEventListener('focus', addPrompt);

	/* Удаление подсказки при снятии фокуса */
	inputPas.addEventListener('blur', deletePrompt);
};
