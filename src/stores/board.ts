import Store from './baseStore';
import {BoardActions, Events} from '../modules/actions';
import {ajaxMethods} from '../ajax/board';
import {ResponseStatus} from '../constants/constants';
import router from '../modules/router';
import {Url} from '../constants/constants';
import {DispatcherAction} from '../modules/types';

export default new (class Board extends Store {
	_data: {
		board: {
			idb: number,
			title: string,
			description: string,
			Lists: Array<{
				title: string,
				idl: number,
				Tasks: Array<{
					idt: number,
					title: string,
				}>,
			}>,
		}
	};

	/**
	 * @constructor
	 */
	constructor() {
		super('Board', {
			board: null,
		});
	}

	/**
	 * Метод, который переопределяют в субклассах, чтобы передавать в диспетчер
	 * @param {DispatcherAction} action событие
	 */
	async _callback(action: DispatcherAction) {
		switch (action.type) {
		case BoardActions.loadBoard:
			await this._loadBoard();
			break;
		case BoardActions.updateBoard:
			await this._updateBoard(action);
			break;
		case BoardActions.createList:
			await this._createList(action);
			break;
		case BoardActions.addTask:
			await this._addTask(action);
			break;
		case BoardActions.deleteDesk:
			await this._deleteDesk();
			break;
		case BoardActions.deleteList:
			await this._deleteList(action);
			break;
		case BoardActions.updateList:
			await this._updateList(action);
			break;
		case BoardActions.updateTask:
			await this._updateTask(action);
			break;
		case BoardActions.deleteTask:
			await this._deleteTask(action);
			break;
		}
	}

	/**
	 * Загрузка в стор информации
	 */
	async _loadBoard() {
		const res = await ajaxMethods.loadBoard(window.location.pathname.split('/').pop());

		switch (res.status) {
		case ResponseStatus.success:
			this._data.board = res.body;
			break;
		case ResponseStatus.forbidden:
			this._data.board = res.body;
			break;
		default:
			router.open(Url.notFound);
			return;
		}

		this._publish(Events.boardUpdate);
	}

	/**
	 * Загрузка в стор информации
	 * @param {DispatcherAction} action
	 */
	async _createList(action: DispatcherAction) {
		const res = await ajaxMethods.createList({id: this._data.board.idb, body: action.body});

		switch (res.status) {
		case ResponseStatus.success:
			this._data.board.Lists.push({
				...res.body,
				Tasks: [],
			});
			break;
		}

		this._publish(Events.boardUpdate);
	}

	/**
	 * Загрузка в стор информации
	 * @param {DispatcherAction} action
	 */
	async _updateBoard(action: DispatcherAction) {
		const res = await ajaxMethods.updateBoard({id: this._data.board.idb, body: action.body});

		switch (res.status) {
		case ResponseStatus.noContent:
		case ResponseStatus.created:
		case ResponseStatus.success:
			this._data.board.title = action.body.title;
			break;
		}

		this._publish(Events.boardUpdate);
	}

	/**
	 * Загрузка в стор информации
	 * @param {DispatcherAction} action
	 */
	async _addTask(action: DispatcherAction) {
		const res = await ajaxMethods.addTask({idb: this._data.board.idb, idl: action.id, body: action.body});

		switch (res.status) {
		case ResponseStatus.noContent:
		case ResponseStatus.created:
		case ResponseStatus.success:
			this._data.board.Lists.map((list) => {
				if (list.idl === Number(action.id)) {
					list.Tasks.push(res.body);
				}
			});

			break;
		}

		this._publish(Events.boardUpdate);
	}

	/**
	 * Загрузка в стор информации
	 */
	async _deleteDesk() {
		const res = await ajaxMethods.deleteDesk({id: this._data.board.idb});

		switch (res.status) {
		case ResponseStatus.success:
			router.open(Url.base);
			break;
		}
	}

	/**
	 * Загрузка в стор информации
	 * @param {DispatcherAction} action
	 */
	async _deleteList(action: DispatcherAction) {
		const res = await ajaxMethods.deleteList({id: action.id});

		switch (res.status) {
		case ResponseStatus.success:
			this._data.board.Lists.forEach((list, i) => {
				if (list.idl === Number(action.id)) {
					delete this._data.board.Lists[i];
				}
			});
			break;
		}

		this._publish(Events.boardUpdate);
	}

	/**
	 * Загрузка в стор информации
	 * @param {DispatcherAction} action
	 */
	async _updateList(action: DispatcherAction) {
		const res = await ajaxMethods.updateList({id: action.id, body: action.body});

		switch (res.status) {
		case ResponseStatus.created:
			this._data.board.Lists.forEach((list) => {
				if (list.idl === Number(action.id)) {
					list.title = action.body.title;
				}
			});
			break;
		}

		this._publish(Events.boardUpdate);
	}

	/**
	 * Загрузка в стор информации
	 * @param {DispatcherAction} action
	 */
	async _updateTask(action: DispatcherAction) {
		const res = await ajaxMethods.updateTask({id: action.id, body: action.body});

		switch (res.status) {
		case ResponseStatus.created:
			this._data.board.Lists.map((list) => {
				list.Tasks.map((task) => {
					if (task.idt === Number(action.id)) {
						task.title = action.body.title;
					}
				});
			});
			break;
		}

		this._publish(Events.boardUpdate);
	}

	/**
	 * Загрузка в стор информации
	 * @param {DispatcherAction} action
	 */
	async _deleteTask(action: DispatcherAction) {
		const res = await ajaxMethods.deleteTask({id: action.id});

		switch (res.status) {
		case ResponseStatus.success:
			this._data.board.Lists.forEach((list, j) => {
				list.Tasks.forEach((task, i) => {
					if (task.idt === Number(action.id)) {
						delete this._data.board.Lists[j].Tasks[i];
					}
				});
			});
			break;
		}

		this._publish(Events.boardUpdate);
	}

	/**
	 * Получение title
	 * @return {string}
	 */
	getTitle(): string {
		return this._data.board.title;
	}

	/**
	 * Получение title
	 * @return {string}
	 */
	getDescription(): string {
		return this._data.board.description;
	}
});
