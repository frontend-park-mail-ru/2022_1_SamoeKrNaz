'use strict';

import Store from './baseStore.js';

/**
 * Класс реализующий стор для профиля пользователя
 */
class Profile extends Store {
	/**
	 * @constructor
	 * @param {object} data поля состояния стора
	 */
	constructor(data) {
		super('Profile', data);
	}
}

export default Profile;
