import signupPageTemp from './signupPage.hbs';
import error from '../../components/error/error.hbs';

import BaseView from '../baseView';
import EventBus from '../../modules/eventBus';
import {ProfileActions, ProfileEvents} from '../../modules/actions';
import Dispatcher from '../../modules/dispatcher';
import Profile from '../../stores/profile';
import router from '../../modules/router';
import {Url} from '../../constants/constants';
import type {ProfileStore} from '../../modules/types';

/**
 * Класс, реализующий страницу логина.
 */
export default new (class SignupPage extends BaseView {
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
						type: ProfileActions.register,
						login: (<HTMLInputElement>document.getElementById('input_login')).value,
						password: (<HTMLInputElement>document.getElementById('input_pass')).value,
						passwordRepeat: (<HTMLInputElement>document.getElementById('input_pass_rep')).value,
					});

					return false;
				},
			},
		]);

		EventBus.subscribe(ProfileEvents.register, this.registerError);
	}

	/**
	 * Метод отвечающий за генерацию View
	 */
	render(): void {
		const html = signupPageTemp();

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
	 * @param {ProfileStore} data состояние пользователя
	 */
	registerError(data: ProfileStore): void {
		const el = document.getElementsByClassName('auth__block_error')[0];
		if (el) {
			el.remove();
		}

		const authDescp = document.getElementsByClassName('auth__block_descp')[0];
		const html = error({errorText: data.validation.errorMsg});
		authDescp.outerHTML += html;
	}
});
