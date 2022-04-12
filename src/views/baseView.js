'use strict';

/**
 * Базовый класс View
 */
class BaseView {
	/**
	 * @constructor
	 * @param {array<object>} data информация об обработчиках, хранящаяся в переменной
	 */
	constructor(data) {
		this._listeners = data;
	}

	/**
	 * Метод отвечающий за генерацию View
	 * @param {object} data данные, на основе которых будет формироваться страница
	 */
	render(data = null) {
		console.error('Нужно переопределить метод в классе');
	}

	/**
	 * Метод, навешивающий обработчки на страницу
	 */
	_createListeners() {
		this._listeners.map((listener) => {
			if (listener.className) {
				document.getElementsByClassName(listener.className)[0].addEventListener(listener.type, listener.func);
			} else {
				document.getElementById(listener.id).addEventListener(listener.type, listener.func);
			}
		});
	}

	/**
	 * Метод, удаляющий обработчки на страницы
	 */
	removeListeners() {
		this._listeners.map((listener) => {
			if (listener.className) {
				document.getElementsByClassName(listener.className)[0]?.removeEventListener(listener.type, listener.func);
			} else {
				document.getElementById(listener.id)?.removeEventListener(listener.type, listener.func);
			}
		});
	}
}


export default BaseView;
