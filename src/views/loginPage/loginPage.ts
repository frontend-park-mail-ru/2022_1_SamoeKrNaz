import loginPageTemp from './loginPage.hbs';
import error from '../../components/error/error.hbs';

import BaseView from '../baseView';
import EventBus from '../../modules/eventBus';
import {ProfileActions, ProfileEvents} from '../../modules/actions';
import Dispatcher from '../../modules/dispatcher';
import router from '../../modules/router';
import Profile from '../../stores/profile';
import {Url} from '../../constants/constants';
import {ProfileStore} from '../../modules/types';

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
	 */
	render() {
		const html = loginPageTemp();

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
	loginError(data: ProfileStore) {
		const el = document.getElementsByClassName('auth__block_error')[0];
		if (el) {
			el.remove();
		}

		const authDescp = document.getElementsByClassName('auth__block_descp')[0];
		const html = error({errorText: data.validation.errorMsg});
		authDescp.outerHTML += html;
	}
});
