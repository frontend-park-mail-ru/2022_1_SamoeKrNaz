'use strict';

/**
 * Базовый класс View
 */
class BaseView {
	/**
	 * @constructor
	 */
	constructor() {

	}

	/**
	 * Метод отвечающий за генерацию View
	 * @param {object} data данные, на основе которых будет формироваться страница
	 */
	render(data = null) {
		console.error('Нужно переопределить метод в классе');
	}
}

export default BaseView;
