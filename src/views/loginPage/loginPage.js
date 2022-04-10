'use strict';

import {validateLoginPage, validateSignUpPage} from '../../modules/validation.js';
import * as render from './loginPage.templ.js';
import {deleteListeners} from '../../modules/deleteEventListeners.js';
import BaseView from '../baseView.js';
import EventBus from '../../modules/eventBus.js';
import {ProfileActions, ProfileEvents} from '../../modules/actions.js';
import Dispatcher from '../../modules/dispatcher.js';

/**
 * Класс, реализующий страницу логина.
 */
export default new class LoginPage extends BaseView {
	/**
	 * @constructor
	 */
	constructor() {
		super();

		EventBus.subscribe(ProfileEvents.login, this.loginError);
	}

	/**
	 * Метод отвечающий за генерацию View
	 * @param {object} data данные, на основе которых будет формироваться страница
	 */
	render(data= null) {
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

		/* Рендер шаблона с входными данными */
		const loginPage = Handlebars.templates.loginPage;
		const html = loginPage({});

		/* Создание контейнера для вставки в DOM */
		document.body.innerHTML = '';
		const container = document.createElement('div');
		container.className = 'container';
		document.body.appendChild(container);
		document.getElementsByClassName('container')[0].innerHTML += html;

		this._createListeners();
	}

	/**
	 * Метод, навешивающий обработчки на страницу
	 */
	_createListeners() {
		/* Навешивание обработчика валидации данных для формы логина */
		const form = document.getElementById('input_form');
		form.onsubmit = () => {
			Dispatcher.dispatch({
				type: ProfileActions.login,
				login: document.getElementById('input_login').value,
				password: document.getElementById('input_pass').value,
			});

			return false;
		};
	}

	/**
	 * Метод выводящий сообщение об ошибке на страницу логина
	 * @param {object} data состояние пользователя
	 */
	loginError(data) {
		const el = document.getElementsByClassName('auth__block_error')[0];
		if (el) {
			el.remove();
		}

		const authDescp = document.getElementsByClassName('auth__block_descp')[0];
		const error = Handlebars.templates.error;
		const html = error({errorText: data.validation.errorMsg});
		authDescp.outerHTML += html;
	}
};
