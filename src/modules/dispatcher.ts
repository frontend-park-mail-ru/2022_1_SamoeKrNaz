import { DispatcherAction } from './types';

type Callback = (action: DispatcherAction) => void;

/**
 * Синглтон, реализующий функционал диспетчера в flux-архитектуре
 */
class Dispatcher {
	_callbacks: Map<number, {
		action: Callback,
		isWait: boolean,
	}>;
	_i: number;
	_currentAction: DispatcherAction;

	/**
	 * @constructor
	 */
	constructor() {
		this._callbacks = new Map(); // библиотека, в которой будут храниться все колбэки и информация по их выполнению
		this._i = 0; // итератор для выдачи айдишников событиям
	}

	/**
	 * Метод, регистрирующий события в диспетчере
	 * @param {DispatcherCallback} callback функция, которую будет вызывать диспетчер
	 * @return {number} id зарегистрированного события
	 */
	register(callback: Callback): number {
		this._callbacks.set(this._i, {
			action: callback,
			isWait: false,
		});

		return this._i++;
	}

	/**
	 * Метод, вызывающий события в диспетчере
	 * @param {DispatcherAction} action функция, которую будет вызывать диспетчер
	 */
	dispatch(action: DispatcherAction): void {
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
	 * @param {number} id функция, которую будет вызывать диспетчер
	 */
	unregister(id: number): void {
		this._callbacks.delete(id);
	}

	/**
	 * Метод, позволяющий узнать, выполнились ли действия привязанные к конкретным id
	 * @param {Array<number>} ids функция, которую будет вызывать диспетчер
	 */
	wait(ids: Array<number>): void {
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
