/**
 * Синглтон, реализующий функционал диспетчера в flux-архитектуре
 */
class Dispatcher {
	/**
	 * @constructor
	 */
	constructor() {
		this._callbacks = new Map(); // библиотека, в которой будут храниться все колбэки и информация по их выполнению
		this._i = 0; // итератор для выдачи айдишников событиям
	};

	/**
	 * Метод, регистрирующий события в диспетчере
	 * @param {object} callback функция, которую будет вызывать диспетчер
	 * @return {number} id зарегистрированного события
	 */
	register(callback) {
		this._callbacks.set(this._i, {
			action: callback,
			isWait: false,
		});

		return this._i++;
	}

	/**
	 * Метод, вызывающий события в диспетчере
	 * @param {object} action функция, которую будет вызывать диспетчер
	 */
	dispatch(action) {
		this._currentAction = action;

		this._callbacks.forEach((el) => {
			el.isWait = true;
		});

		this._callbacks.forEach((el) => {
			if (el.isWait) {
				el.isWait = false;
				el.action(this._currentAction);
			}
		});
	}

	/**
	 * Метод, удаляющий событие в диспетчере
	 * @param {int} id функция, которую будет вызывать диспетчер
	 */
	unregister(id) {
		this._callbacks.delete(id);
	}

	/**
	 * Метод, позволяющий узнать, выполнились ли действия привязанные к конкретным id
	 * @param {array<int>} ids функция, которую будет вызывать диспетчер
	 */
	wait(ids) {
		ids.map((id) => {
			const el = this._callbacks.get(id);

			if (el !== undefined && el.isWait) {
				el.isWait = false;
				el.action(this._currentAction);
			}
		});
	}
}

export default new Dispatcher();
