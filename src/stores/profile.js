'use strict';

import Store from './baseStore.js';
import {ProfileActions} from '../modules/actions.js';
import Ajax from '../modules/ajax.js';

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

		this._network = {
			async loadProfile() {
				try {
					return await Ajax.get('/profile');
				} catch (err) {
					console.error(err);
				}
			},
		};
	}

	/**
	 * Метод, который переопределяют в субклассах, чтобы передавать в диспетчер
	 * @param {object} action событие
	 */
	async _callback(action) {
		switch (action.type) {
		case ProfileActions.loadProfile:
			try {
				const res = await Ajax.get({url: '/profile'});
				console.log(res);
			} catch (err) {
				console.error(err);
			}
			break;
		}
	}

	/**
	 * Получение и обработка информации о профиле пользователя
	 */
	async _loadProfile() {
		const res = await this._network.loadProfile();

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
