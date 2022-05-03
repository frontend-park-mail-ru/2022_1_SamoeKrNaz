import successBlock from '../../components/success/success.hbs';
import error from '../../components/error/error.hbs';

import BaseView from '../baseView';
import EventBus from '../../modules/eventBus';
import {ProfileActions, ProfileEvents} from '../../modules/actions';
import Dispatcher from '../../modules/dispatcher';
import Profile from '../../stores/profile';
import {ProfileStore} from '../../modules/types';

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
				func: () => {
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
	 */
	render(): void {
		this.onUpdate(Profile.getState());

		this._createListeners();
	}

	/**
	 * Метод, вызывающийся при обновлении стора досок
	 * @param {ProfileStore} data состояние стора
	 */
	onUpdate(data: ProfileStore): void {
		if (data.username) {
			(<HTMLInputElement>document.getElementById('input_login')).value = data.username;
			(<HTMLInputElement>document.getElementsByClassName('settings__avatar')[0]).src = data.img;
		}
	}

	/**
	 * Метод, навешивающий обработчки на страницу
	 */
	_createListeners(): void {
		super._createListeners();

		/* Навешивание обработчика валидации данных для формы регистрации */
		const form = document.getElementById('input_form_settings');
		form.onsubmit = (e) => {
			console.log(e);
			Dispatcher.dispatch({
				type: ProfileActions.update,
				login: (<HTMLInputElement>document.getElementById('input_login')).value,
				password: (<HTMLInputElement>document.getElementById('input_pass')).value,
				passwordRepeat: (<HTMLInputElement>document.getElementById('input_pass_rep')).value,
			});
			return false;
		};
	}

	/**
	 * Метод выводящий сообщение об успешной валидации в настройках
	 * @param {ProfileStore} data состояние пользователя
	 */
	saveSuccess(data: ProfileStore): void {
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
	 * @param {ProfileStore} data состояние пользователя
	 */
	saveUnSuccess(data: ProfileStore): void {
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
	 * @param {ProfileStore} data состояние пользователя
	 */
	avatarSuccess(data: ProfileStore): void {
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
		const avatar = (<HTMLInputElement>document.getElementsByClassName('settings__avatar')[0]);
		avatar.src = data.avatar.avatarPath + '?' + randomString;
	}

	/**
	 * Метод выводящий сообщение об ошибке загрузки аватарки
	 * @param {ProfileStore} data состояние пользователя
	 */
	avatarUnSuccess(data: ProfileStore): void {
		const success = document.getElementsByClassName('success_block')[0];
		if (success) {
			success.remove();
		}
		const err = document.getElementsByClassName('auth__block_error')[0];
		if (err) {
			err.remove();
		}

		const sep = document.getElementsByClassName('settings__separator')[1];
		const html = error({settings: true, errorText: data.avatar.unSuccessAv});
		sep.outerHTML += html;
	}
});
