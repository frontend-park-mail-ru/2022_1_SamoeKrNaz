/**
 * Синглтон, реализующий функционал диспетчера в flux-архитектуре
 */
class Dispatcher {
	/**
	 * @constructor
	 */
	constructor() {
		this._callbacks = []; // библиотека, в которой будут храниться все колбэки
	};

	/**
	 * Метод, регистрирующий события в диспетчере
	 * @param {object} callback функция, которую будет вызывать диспетчер
	 * @return {int} id зарегистрированного события
	 */
	register(callback) {
		this._callbacks.push(callback);
		return this._callbacks.length - 1;
	}

	/**
	 * Метод, вызывающий события в диспетчере
	 * @param {object} action функция, которую будет вызывать диспетчер
	 */
	dispatch(action) {
		this._callbacks.map((callback) => callback(action));
	}

	/**
	 * Метод, удаляющий событие в диспетчере
	 * @param {int} id функция, которую будет вызывать диспетчер
	 */
	unregister(id) {
		this._callbacks.splice(id, 1);
	}
}

export default new Dispatcher();
