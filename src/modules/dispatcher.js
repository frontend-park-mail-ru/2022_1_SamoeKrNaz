/**
 * Синглтон, реализующий функционал диспетчера в flux-архитектуре
 */
class Dispatcher {
	/**
	 * @constructor
	 */
	constructor() {
		this._callbacks = {}; // библиотека, в которой будут храниться все колбэки
		this._isWaiting = {}; // false - если событие выполнилось, true если ожидает выполнения
		this._i = 0;
	};

	/**
	 * Метод, регистрирующий события в диспетчере
	 * @param {object} callback функция, которую будет вызывать диспетчер
	 * @return {int} id зарегистрированного события
	 */
	register(callback) {
		this._callbacks[this._i++] = callback;
		this._isWaiting[this._i] = false;
		return this._i;
	}

	/**
	 * Метод, вызывающий события в диспетчере
	 * @param {object} action функция, которую будет вызывать диспетчер
	 */
	dispatch(action) {
		// eslint-disable-next-line guard-for-in
		for (const id in this._callbacks) {
			this._isWaiting[id] = true;
		}

		for (const id in this._callbacks) {
			if ({}.hasOwnProperty.call(this._callbacks, id)) {
				this._callbacks[id](action);
				this._isWaiting[id] = false;
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

	/**
	 * Метод, позволяющий узнать, выполнились ли действия привязанные к конкретным id
	 * @param {array<int>} ids функция, которую будет вызывать диспетчер
	 */
	wait(ids) {
		// eslint-disable-next-line guard-for-in
		for (const id in ids) {
			if ({}.hasOwnProperty.call(this._isWaiting, id)) {
				while (this._isWaiting[id]);
			}
		}
	}
}

export default new Dispatcher();
