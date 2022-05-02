'use strict';

import {EventListener, Event} from '../modules/types';

/**
 * Базовый класс View
 */
class BaseView {
	_listeners: EventListener;

	/**
	 * @constructor
	 * @param {EventListener} data информация об обработчиках, хранящаяся в переменной
	 */
	constructor(data: EventListener) {
		this._listeners = data;
	}

	/**
	 * Метод отвечающий за генерацию View
	 */
	render(e?: MouseEvent) {
		console.error('Нужно переопределить метод в классе');
	}

	/**
	 * Метод, навешивающий обработчки на страницу
	 */
	_createListeners() {
		this._listeners.map((listener) => {
			this._addListener(listener);
		});
	}

	/**
	 * Метод, позволяющий наложить новый обработчки событий
	 * @param {Event} listener
	 */
	_addListener(listener: Event): void {
		if (!listener.isArray) {
			if (listener.className) {
				document.getElementsByClassName(listener.className)[0]?.addEventListener(listener.type, listener.func);
			} else {
				document.getElementById(listener.id)?.addEventListener(listener.type, listener.func);
			}
		} else {
			const els = document.getElementsByClassName(listener.className);

			for (const key in els) {
				if (els.hasOwnProperty(key)) {
					els[key].addEventListener(listener.type, listener.func);
				}
			}
		}
	}

	/**
	 * Метод, позволяющий убрать обработчки событий
	 * @param {Event} listener
	 */
	_removeListener(listener: Event): void {
		if (!listener.isArray) {
			if (listener.className) {
				document.getElementsByClassName(listener.className)[0]?.removeEventListener(listener.type, listener.func);
			} else {
				document.getElementById(listener.id)?.removeEventListener(listener.type, listener.func);
			}
		} else {
			const els = document.getElementsByClassName(listener.className);

			for (const key in els) {
				if (els.hasOwnProperty(key)) {
					els[key].removeEventListener(listener.type, listener.func);
				}
			}
		}
	}

	/**
	 * Метод, удаляющий обработчки на страницы
	 */
	removeListeners() {
		this._listeners.map((listener) => {
			this._removeListener(listener);
		});
	}
}


export default BaseView;
