'use strict';

import Store from './baseStore.js';
import {ProfileActions} from '../modules/actions.js';
import Ajax from '../modules/ajax.js';

/**
 * Класс реализующий стор для профиля пользователя
 */
class Profile extends Store {
	_network = {
		loadProfile() {

		}
	};

	/**
	 * @constructor
	 * @param {object} data поля состояния стора
	 */
	constructor(data) {
		super('Profile', data);
	}

	/**
	 * Метод, который переопределяют в субклассах, чтобы передавать в диспетчер
	 * @param {object} action событие
	 */
	_callback(action) {
		switch (action.type) {
		case ProfileActions.loadProfile:

		}
	}
}

export default Profile;
