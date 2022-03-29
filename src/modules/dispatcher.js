/**
 * Синглтон, реализующий функционал диспетчера в flux-архитектуре
 */
class Dispatcher {
	/**
	 * @constructor
	 */
	constructor() {
		this._callbacks = {}; // библиотека, в которой будут храниться все колбэки
		this._isWaiting = {}; // false - начало исполняться, true если ожидает исполнения
		this._i = 0; // итератор для
	};

	/**
	 * Метод, регистрирующий события в диспетчере
	 * @param {object} callback функция, которую будет вызывать диспетчер
	 * @return {int} id зарегистрированного события
	 */
	register(callback) {
		this._callbacks[this._i] = callback;
		this._isWaiting[this._i] = false;
		this._i++;

		return this._i - 1;
	}

	/**
	 * Метод, вызывающий события в диспетчере
	 * @param {object} action функция, которую будет вызывать диспетчер
	 */
	dispatch(action) {
		this._currentAction = action;

		// eslint-disable-next-line guard-for-in
		for (const id in this._callbacks) {
			this._isWaiting[id] = true;
		}

		for (const id in this._callbacks) {
			if ({}.hasOwnProperty.call(this._callbacks, id) && this._isWaiting[id]) {
				this._isWaiting[id] = false;
				this._callbacks[id](this._currentAction);
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
		ids.map((id) => {
			if (this._isWaiting[id]) {
				this._isWaiting[id] = false;
				this._callbacks[id](this._currentAction);
			}
		});
	}
}

export default new Dispatcher();
