'use strict';

import Dispatcher from '../modules/dispatcher.js';
import EventBus from '../modules/eventBus.js';

/**
 * Базовый класс стора, от которого будут наследоваться все остальные сторы
 */
class Store {
	/**
	 * @constructor
	 * @param {string} name название события
	 * @param {object} data состояние стора
	 */
	constructor(name, data) {
		this._data = data;
		this._name = name;
	}

	/**
	 * Метод, с помощью которого можно опубликовать события для обновления
	 * сторов. Она формирует название с названием стора и передает состояние хранилища
	 * @param {string} event название события
	 */
	publish(event) {
		EventBus.publish(this._name + event, this._data);
	}
}

export default new Store();
