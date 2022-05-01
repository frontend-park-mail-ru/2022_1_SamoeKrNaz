/**
 * Синглтон, реализующий функционал диспетчера в flux-архитектуре
 */
class Dispatcher {
	/**
	 * @constructor
	 */
	constructor() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_callbacks' does not exist on type 'Disp... Remove this comment to see the full error message
		this._callbacks = new Map(); // библиотека, в которой будут храниться все колбэки и информация по их выполнению
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_i' does not exist on type 'Dispatcher'.
		this._i = 0; // итератор для выдачи айдишников событиям
	}

	/**
	 * Метод, регистрирующий события в диспетчере
	 * @param {object} callback функция, которую будет вызывать диспетчер
	 * @return {number} id зарегистрированного события
	 */
	register(callback) {
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_callbacks' does not exist on type 'Disp... Remove this comment to see the full error message
		this._callbacks.set(this._i, {
			action: callback,
			isWait: false,
		});

		// @ts-expect-error ts-migrate(2339) FIXME: Property '_i' does not exist on type 'Dispatcher'.
		return this._i++;
	}

	/**
	 * Метод, вызывающий события в диспетчере
	 * @param {object} action функция, которую будет вызывать диспетчер
	 */
	dispatch(action) {
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_currentAction' does not exist on type '... Remove this comment to see the full error message
		this._currentAction = action;

		// @ts-expect-error ts-migrate(2339) FIXME: Property '_callbacks' does not exist on type 'Disp... Remove this comment to see the full error message
		this._callbacks.forEach((el) => {
			el.isWait = true;
		});

		// @ts-expect-error ts-migrate(2339) FIXME: Property '_callbacks' does not exist on type 'Disp... Remove this comment to see the full error message
		this._callbacks.forEach((el) => {
			if (el.isWait) {
				el.isWait = false;
				// @ts-expect-error ts-migrate(2339) FIXME: Property '_currentAction' does not exist on type '... Remove this comment to see the full error message
				el.action(this._currentAction);
			}
		});
	}

	/**
	 * Метод, удаляющий событие в диспетчере
	 * @param {int} id функция, которую будет вызывать диспетчер
	 */
	unregister(id) {
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_callbacks' does not exist on type 'Disp... Remove this comment to see the full error message
		this._callbacks.delete(id);
	}

	/**
	 * Метод, позволяющий узнать, выполнились ли действия привязанные к конкретным id
	 * @param {array<int>} ids функция, которую будет вызывать диспетчер
	 */
	wait(ids) {
		ids.map((id) => {
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_callbacks' does not exist on type 'Disp... Remove this comment to see the full error message
			const el = this._callbacks.get(id);

			if (el !== undefined && el.isWait) {
				el.isWait = false;
				// @ts-expect-error ts-migrate(2339) FIXME: Property '_currentAction' does not exist on type '... Remove this comment to see the full error message
				el.action(this._currentAction);
			}
		});
	}
}

export default new Dispatcher();
