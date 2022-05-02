import SignupPageTemp from './signupPage.hbs';
import error from '../../components/error/error.hbs';

import BaseView from '../baseView';
import EventBus from '../../modules/eventBus';
import {ProfileActions, ProfileEvents} from '../../modules/actions';
import Dispatcher from '../../modules/dispatcher';
import Profile from '../../stores/profile';
import router from '../../modules/router';
import {Url} from '../../constants/constants';
import {ProfileStore} from '../../modules/types';

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
				type: 'focus', // Тип обработчика, который навешивается
				id: 'input_pass', // Класс, на который навешивается обработчки
				func: () => { // Функция, которая вызывается обработчиком
					const el = document.getElementsByClassName('auth__block_prompt')[0];
					if (el) {
						el.remove();
					}

					const inputPass = document.getElementById('input_pass_rep');

					const promptBlock = document.createElement('div');
					promptBlock.className = 'auth__block_prompt';
					promptBlock.innerHTML = 'Для защиты ваших данных необходимо придумать безопасный пароль. Он должен содержать:';

					const firstReq = document.createElement('div');
					firstReq.className = ('auth__block_prompt_line');
					firstReq.innerHTML = '<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px">\n' +
						'<path d="M15.3049 7.63341C15.5756 7.34626 15.5628 6.89412 15.2764 6.62341C14.9892 6.35269 14.5371 6.36553 14.2664 6.65196L9.38848 11.8141L6.7335 9.00482C6.46278 8.71839 6.01064 8.70555 5.72349 8.97627C5.43707 9.24698 5.42422 9.69913 5.69494 9.98627L8.8692 13.3498C9.0042 13.4927 9.19205 13.5713 9.38848 13.5713C9.58562 13.5713 9.77352 13.4927 9.9078 13.3498L15.3049 7.63341Z" fill="#ABB7C0"/>\n' +
						'<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 0C4.97714 0 0.5 4.47714 0.5 10C0.5 15.5214 4.97714 20 10.5 20C16.0229 20 20.5 15.5214 20.5 10C20.5 4.47714 16.0229 0 10.5 0ZM1.92857 10C1.92857 5.26643 5.76643 1.42857 10.5 1.42857C15.2336 1.42857 19.0714 5.26643 19.0714 10C19.0714 14.7357 15.2336 18.5714 10.5 18.5714C5.76643 18.5714 1.92857 14.7357 1.92857 10Z" fill="#ABB7C0"/>\n' +
						'</svg>\n';
					firstReq.innerHTML += '7 и более символов';
					inputPass.parentNode.insertBefore(promptBlock, inputPass.nextSibling);

					document.getElementsByClassName('auth__block_prompt')[0]?.appendChild(firstReq);
				},
			},
			{
				type: 'blur', // Тип обработчика, который навешивается
				id: 'input_pass', // Класс, на который навешивается обработчки
				func: () => { // Функция, которая вызывается обработчиком
					const el = document.getElementsByClassName('auth__block_prompt')[0];
					if (el) {
						el.remove();
					}
				},
			},
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
		const html = new SignupPageTemp();

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
