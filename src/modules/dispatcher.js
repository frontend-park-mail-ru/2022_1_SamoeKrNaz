/**
 * Синглтон, реализующий функционал диспетчера в flux-архитектуре
 */
class Dispatcher {
	/**
	 * @constructor
	 */
	constructor() {
		this._callbacks = {}; // библиотека, в которой будут храниться все колбэки
		this._i = 0;
	};

	/**
	 * Метод, регистрирующий события в диспетчере
	 * @param {object} callback функция, которую будет вызывать диспетчер
	 * @return {int} id зарегистрированного события
	 */
	register(callback) {
		this._callbacks[this._i++] = callback;
		return this._i;
	}

	/**
	 * Метод, вызывающий события в диспетчере
	 * @param {object} action функция, которую будет вызывать диспетчер
	 */
	dispatch(action) {
		for (const callback in this._callbacks) {
			if ({}.hasOwnProperty.call(this._callbacks, callback)) {
				this._callbacks[callback](action);
			}
		}
	}

	/**
	 * Метод, удаляющий событие в диспетчере
	 * @param {int} id функция, которую будет вызывать диспетчер
	 */
	unregister(id) {
		delete this._callbacks[id];
	}
}

export default new Dispatcher();
