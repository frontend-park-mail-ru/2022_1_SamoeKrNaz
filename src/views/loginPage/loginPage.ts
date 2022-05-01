// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './loginPage.templ.js' or its c... Remove this comment to see the full error message
import * as render from './loginPage.templ.js';
import BaseView from '../baseView.js';
import EventBus from '../../modules/eventBus.js';
import {ProfileActions, ProfileEvents} from '../../modules/actions.js';
import Dispatcher from '../../modules/dispatcher.js';
import router from '../../modules/router.js';
import Profile from '../../stores/profile.js';
import {Url} from '../../constants/constants.js';
import BasePage from '../basePage/basePage.js';

/**
 * Класс, реализующий страницу логина.
 */
export default new (class LoginPage extends BaseView {
	/**
	 * @constructor
	 */
	constructor() {
		super([
			{
				type: 'submit', // Тип обработчика, который навешивается
				id: 'input_form', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					e.preventDefault();
					Dispatcher.dispatch({
						type: ProfileActions.login,
						// @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'HTMLEleme... Remove this comment to see the full error message
						login: document.getElementById('input_login').value,
						// @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'HTMLEleme... Remove this comment to see the full error message
						password: document.getElementById('input_pass').value,
					});

					return false;
				},
			},
		]);

		EventBus.subscribe(ProfileEvents.login, this.loginError);
	}

	/**
	 * Метод отвечающий за генерацию View
	 * @param {object} data данные, на основе которых будет формироваться страница
	 */
	render(data = null) {
		/* Регистрация всех компонентов для страницы */
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Handlebars'.
		Handlebars.registerPartial('button', Handlebars.templates['button']);
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Handlebars'.
		Handlebars.registerPartial('decoration', Handlebars.templates['decoration']);
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Handlebars'.
		Handlebars.registerPartial('error', Handlebars.templates['error']);
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Handlebars'.
		Handlebars.registerPartial('input', Handlebars.templates['input']);
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Handlebars'.
		Handlebars.registerPartial('loginBlock', Handlebars.templates['loginBlock']);

		/* Рендер шаблона с входными данными */
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Handlebars'.
		const loginPage = Handlebars.templates.loginPage;
		const html = loginPage({});

		/* Создание контейнера для вставки в DOM */
		document.body.innerHTML = '';
		const container = document.createElement('div');
		container.className = 'container';
		document.body.appendChild(container);
		document.getElementsByClassName('container')[0].innerHTML += html;

		this._createListeners();

		if (Profile.isLoad()) {
			router.open(Url.base);
		}
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
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Handlebars'.
		const error = Handlebars.templates.error;
		const html = error({errorText: data.validation.errorMsg});
		authDescp.outerHTML += html;
	}
});
