'use strict';

import Store from './baseStore.js';
import {ProfileActions} from '../modules/actions.js';
import Ajax from '../ajax/ajax.js';
import {network} from '../ajax/profile.js';

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
	_callback(action) {
		switch (action.type) {
		case ProfileActions.loadProfile:
			this.loadProfile();
			break;
		}
	}

	/**
	 * Получение и обработка информации о профиле пользователя
	 */
	async loadProfile() {
		const res = await network.loadProfile();

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
