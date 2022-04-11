'use strict';

import Store from './baseStore.js';
import {ProfileActions, ProfileEvents} from '../modules/actions.js';
import {Messages, ResponseStatus} from '../constants/constants.js';
import {ajaxMethods} from '../ajax/profile.js';

/**
 * Класс реализующий стор для профиля пользователя
 */
class Profile extends Store {
	/**
	 * @constructor
	 */
	constructor() {
		super('Profile', {
			isAuth: undefined,
			id: undefined,
			username: undefined,
			img: undefined,

			validation: {
				errorMsg: undefined,
			},
		});
	}

	/**
	 * Метод, который переопределяют в субклассах, чтобы передавать в диспетчер
	 * @param {object} action событие
	 */
	async _callback(action) {
		switch (action.type) {
		case ProfileActions.loadProfile:
			await this._loadProfile();
			break;
		case ProfileActions.login:
			await this._loginValidation(action);
			break;
		case ProfileActions.register:
			await this._registerValidation(action);
			break;
		}
	}

	/**
	 * Получение и обработка информации о профиле пользователя
	 */
	async _loadProfile() {
		const res = await ajaxMethods.loadProfile();

		switch (res.status) {
		case ResponseStatus.unAuth:
			this._data.isAuth = false;
			break;
		case ResponseStatus.success:
			this._loadInfo(res.body);
			break;
		}

		this._publish(ProfileEvents.load);
	}

	/**
	 * Получение и обработка информации о профиле пользователя при логине
	 * @param {object} data инфорация о событии
	 */
	async _loginValidation(data) {
		console.log(data);

		if ((data.login.length <= 6 || data.login.length > 20) && (data.login.length <= 6 || data.login.length > 20)) {
			this._data.validation.errorMsg = Messages['shortLoginPassword'];
			this._publish(ProfileEvents.login);
			return;
		}
		if (data.login.length <= 6 || data.login.length > 20) {
			this._data.validation.errorMsg = Messages['shortLogin'];
			this._publish(ProfileEvents.login);
			return;
		}
		if (data.password.length <= 6 || data.password.length > 20) {
			this._data.validation.errorMsg = Messages['shortPassword'];
			this._publish(ProfileEvents.login);
			return;
		}

		const res = await ajaxMethods.loginProfile({Username: data.login, Password: data.password});

		switch (res.status) {
		case ResponseStatus.success:
			this._loadInfo(res.body);
			break;
		case ResponseStatus.badRequest:
			this._data.validation.errorMsg = Messages['notLogin'];
			this._publish(ProfileEvents.login);
			break;
		}
	}

	/**
	 * Получение и обработка информации о профиле пользователя при регистрации
	 * @param {object} data инфорация о событии
	 */
	async _registerValidation(data) {
		console.log(data);

		if ((data.login.length <= 6 || data.login.length > 20) && (data.login.length <= 6 || data.login.length > 20)) {
			this._data.validation.errorMsg = Messages['shortLoginPassword'];
			this._publish(ProfileEvents.register);
			return false;
		}
		if (data.login.length <= 6 || data.login.length > 20) {
			this._data.validation.errorMsg = Messages['shortLogin'];
			this._publish(ProfileEvents.register);
			return false;
		}
		if (data.password.length <= 6 || data.password.length > 20) {
			this._data.validation.errorMsg = Messages['shortPassword'];
			this._publish(ProfileEvents.register);
			return false;
		}
		if (data.password !== data.passwordRepeat) {
			this._data.validation.errorMsg = Messages['repeatPassword'];
			this._publish(ProfileEvents.register);
			return false;
		}

		const res = await ajaxMethods.registerProfile({Username: data.login, Password: data.password});

		switch (res.status) {
		case ResponseStatus.created:
			this._loadInfo(res.body);
			break;
		case ResponseStatus.conflict:
			this._data.validation.errorMsg = Messages['alreadyRegister'];
			this._publish(ProfileEvents.register);
			break;
		}
	}

	/**
	 * Метод, авторизующий пользователя в сторе
	 * @param {object} data инфа о авторизировавшимся пользователе
	 */
	_loadInfo(data) {
		this._data.isAuth = true;

		this._data.id = data.id;
		this._data.username = data.username;
		this._data.img = data.img_avatar;
	}

	/**
	 * Проверка, загружен ли профиль
	 * @return {string}
	 */
	isLoad() {
		return this._data.isAuth;
	}
}

export default new Profile();
