'use strict';

import Store from './baseStore.js';
import {ProfileActions} from '../modules/actions.js';
import Ajax from '../ajax/ajax.js';
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
		}
	}

	/**
	 * Получение и обработка информации о профиле пользователя
	 */
	async _loadProfile() {
		const res = await ajaxMethods.loadProfile();

		console.log(res);
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
