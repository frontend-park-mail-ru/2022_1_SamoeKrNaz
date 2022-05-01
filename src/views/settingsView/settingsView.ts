import successBlock from '../../components/success/success.hbs';
import error from '../../components/error/error.hbs';

import BaseView from '../baseView';
import {Messages, ResponseStatus, Url} from '../../constants/constants';
import router from '../../modules/router';
import EventBus from '../../modules/eventBus';
import {ProfileActions, ProfileEvents} from '../../modules/actions';
import Dispatcher from '../../modules/dispatcher';
import Profile from '../../stores/profile';
import {ajaxMethods} from '../../ajax/profile';

/**
 * Класс, реализующий страницу логина.
 */
export default new (class SettingsView extends BaseView {
	/**
	 * @constructor
	 */
	constructor() {
		super([
			{
				type: 'click',
				className: 'settingsButton',
				func: (e) => {
					const settingsBg = document.getElementsByClassName('settings__bg')[0]; // Фон попап окна
					const settings = document.getElementsByClassName('settings')[0]; // Само окно

					e.preventDefault(); // Предотвращаем дефолтное поведение браузера
					settingsBg.classList.add('active'); // Добавляем класс 'active' для фона
					settings.classList.add('active'); // И для самого окна;
				},
			},
			{
				type: 'click',
				className: 'settings__close',
				func: (e) => {
					const success = document.getElementsByClassName('success_block')[0];
					if (success) {
						success.remove();
					}
					const err = document.getElementsByClassName('auth__block_error')[0];
					if (err) {
						err.remove();
					}
					const settingsBg = document.getElementsByClassName('settings__bg')[0]; // Фон попап окна
					const settings = document.getElementsByClassName('settings')[0]; // Само окно

					settingsBg.classList.remove('active'); // Убираем активный класс с фона
					settings.classList.remove('active'); // И с окна
				},
			},
			{
				type: 'change',
				id: 'fileUpload',
				func: async (e) => {
					Dispatcher.dispatch({
						type: ProfileActions.uploadAvatar,
						data: e.target.files[0],
					});
				},
			},
		]);

		EventBus.subscribe(ProfileEvents.load, this.onUpdate);

		EventBus.subscribe(ProfileEvents.updateSuccess, this.saveSuccess);
		EventBus.subscribe(ProfileEvents.updateUnSuccess, this.saveUnSuccess);

		EventBus.subscribe(ProfileEvents.updateAvatarSuccess, this.avatarSuccess);
		EventBus.subscribe(ProfileEvents.updateAvatarUnSuccess, this.avatarUnSuccess);
	}

	/**
	 * Метод отвечающий за генерацию View
	 * @param {object} data данные, на основе которых будет формироваться страница
	 */
	render(data = null) {
		this.onUpdate(Profile.getState());

		this._createListeners();
	}

	/**
	 * Метод, вызывающийся при обновлении стора досок
	 * @param {object} data состояние стора
	 */
	onUpdate(data) {
		if (data.username) {
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'HTMLEleme... Remove this comment to see the full error message
			document.getElementById('input_login').value = data.username;
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'src' does not exist on type 'Element'.
			document.getElementsByClassName('settings__avatar')[0].src = data.img;
		}
	}

	/**
	 * Метод, навешивающий обработчки на страницу
	 */
	_createListeners() {
		super._createListeners();

		/* Навешивание обработчика валидации данных для формы регистрации */
		const form = document.getElementById('input_form_settings');
		form.onsubmit = (e) => {
			console.log(e);
			Dispatcher.dispatch({
				type: ProfileActions.update,
				// @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'HTMLEleme... Remove this comment to see the full error message
				login: document.getElementById('input_login').value,
				// @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'HTMLEleme... Remove this comment to see the full error message
				password: document.getElementById('input_pass').value,
				// @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'HTMLEleme... Remove this comment to see the full error message
				passwordRepeat: document.getElementById('input_pass_rep').value,
			});
			return false;
		};
	}

	/**
	 * Метод выводящий сообщение об успешной валидации в настройках
	 * @param {object} data состояние пользователя
	 */
	saveSuccess(data) {
		const success = document.getElementsByClassName('success_block')[0];
		if (success) {
			success.remove();
		}
		const err = document.getElementsByClassName('auth__block_error')[0];
		if (err) {
			err.remove();
		}

		const sep = document.getElementsByClassName('settings__separator')[1];
		const html = successBlock({successText: data.validation.successMsg});
		sep.outerHTML += html;
	}

	/**
	 * Метод выводящий сообщение об ошибке валидации в настройках
	 * @param {object} data состояние пользователя
	 */
	saveUnSuccess(data) {
		const success = document.getElementsByClassName('success_block')[0];
		if (success) {
			success.remove();
		}
		const err = document.getElementsByClassName('auth__block_error')[0];
		if (err) {
			err.remove();
		}

		const sep = document.getElementsByClassName('settings__separator')[1];
		const html = error({settings: true, errorText: data.validation.errorMsg});
		sep.outerHTML += html;
	}

	/**
	 * Метод обновляющий аватарку при удачном запросе
	 * @param {object} data состояние пользователя
	 */
	avatarSuccess(data) {
		const success = document.getElementsByClassName('success_block')[0];
		if (success) {
			success.remove();
		}
		const err = document.getElementsByClassName('auth__block_error')[0];
		if (err) {
			err.remove();
		}

		const sep = document.getElementsByClassName('settings__separator')[1];
		const html = successBlock({successText: data.avatar.successAv});
		sep.outerHTML += html;
		const randomString = performance.now();
		const avatar = document.getElementsByClassName('settings__avatar')[0];
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'src' does not exist on type 'Element'.
		avatar.src = data.avatar.avatarPath + '?' + randomString;
	}

	/**
	 * Метод выводящий сообщение об ошибке загрузки аватарки
	 * @param {object} data состояние пользователя
	 */
	avatarUnSuccess(data) {
		const success = document.getElementsByClassName('success_block')[0];
		if (success) {
			success.remove();
		}
		const err = document.getElementsByClassName('auth__block_error')[0];
		if (err) {
			err.remove();
		}

		const sep = document.getElementsByClassName('settings__separator')[1];
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Handlebars'.
		const error = Handlebars.templates.error;
		const html = error({settings: true, errorText: data.avatar.unSuccessAv});
		sep.outerHTML += html;
	}
});
