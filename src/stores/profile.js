'use strict';

import Store from './baseStore.js';
import {ProfileActions, ProfileEvents} from '../modules/actions.js';
import {Messages, ResponseStatus, Url} from '../constants/constants.js';
import {ajaxMethods} from '../ajax/profile.js';
import router from '../modules/router.js';

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
				successMsg: undefined,
			},

			avatar: {
				successAv: undefined,
				unSuccessAv: undefined,
				avatarPath: undefined,
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
		case ProfileActions.update:
			await this._updateInformation(action);
			break;
		case ProfileActions.uploadAvatar:
			await this._uploadAvatar(action);
			break;
		case ProfileActions.logout:
			await this._logout();
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
			router.open(Url.base);
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
			router.open(Url.base);
			break;
		case ResponseStatus.conflict:
			this._data.validation.errorMsg = Messages['alreadyRegister'];
			this._publish(ProfileEvents.register);
			break;
		}
	}

	/**
	 * Получение и обработка информации о профиле пользователя при регистрации
	 * @param {object} data инфорация о событии
	 */
	async _updateInformation(data) {
		if (data.login === this._data.username && data.password.length === 0 && data.passwordRepeat.length === 0) {
			return false;
		}
		if ((data.login.length <= 6 || data.login.length > 20) && (data.login.length <= 6 || data.login.length > 20)) {
			this._data.validation.errorMsg = Messages['shortLoginPassword'];
			this._publish(ProfileEvents.updateUnSuccess);
			return false;
		}
		if (data.login.length <= 6 || data.login.length > 20) {
			this._data.validation.errorMsg = Messages['shortLogin'];
			this._publish(ProfileEvents.updateUnSuccess);
			return false;
		}
		if ((data.password.length !== 0 || data.passwordRepeat.length !== 0) && (data.password.length <= 6 || data.password.length > 20)) {
			this._data.validation.errorMsg = Messages['shortPassword'];
			this._publish(ProfileEvents.updateUnSuccess);
			return false;
		}
		if (data.password !== data.passwordRepeat) {
			this._data.validation.errorMsg = Messages['repeatPassword'];
			this._publish(ProfileEvents.updateUnSuccess);
			return false;
		}

		const payload = {
			username: data.login,
		};

		if (data.password.length !== 0) {
			payload.password = data.password;
		}

		const res = await ajaxMethods.updateProfile(payload);

		switch (res.status) {
		case ResponseStatus.success:
			this._data.validation.successMsg = Messages['updateSuccess'];
			this._publish(ProfileEvents.updateSuccess);
			break;
		case ResponseStatus.badRequest:
			this._data.validation.errorMsg = Messages['alreadyRegister'];
			this._publish(ProfileEvents.updateUnSuccess);
			break;
		}
	}

	/**
	 * Загрузка аватара и дальнейшее обновление
	 * @param {Object} data инфорация о событии
	 */
	async _uploadAvatar(data) {
		const formData = new FormData();
		formData.append('avatar', data.data);
		const res = await ajaxMethods.uploadAvatar(formData);

		switch (res.status) {
		case ResponseStatus.success:
			this._data.avatar.successAv = Messages['updateSuccess'];
			this._data.avatar.avatarPath = 'avatars/' + res.body.avatar_path;
			this._publish(ProfileEvents.updateAvatarSuccess);
			break;
		case ResponseStatus.badRequest:
			this._data.avatar.unSuccessAv = Messages['updateUnSuccess'];
			console.log(res);
			this._publish(ProfileEvents.updateAvatarUnSuccess);
			break;
		}
	}

	/**
	 * Загрузка аватара и дальнейшее обновление
	 */
	async _logout() {
		const res = await ajaxMethods.logout();

		switch (res.status) {
		case ResponseStatus.success:
			this._data.isAuth = false;
			this._data.username = null;
			router.open(Url.login);
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
		this._data.img = '../' + data.img_avatar;
	}

	/**
	 * Проверка, загружен ли профиль
	 * @return {string}
	 */
	isLoad() {
		return this._data.isAuth;
	}

	/**
	 * Получить состояние пользователя
	 * @return {object}
	 */
	getState() {
		return this._data;
	}
}

export default new Profile();
