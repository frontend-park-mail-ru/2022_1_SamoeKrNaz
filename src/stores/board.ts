import Store from './baseStore';
import {BoardActions, Events} from '../modules/actions';
import {ajaxMethods} from '../ajax/board';
import {ResponseStatus} from '../constants/constants';
import router from '../modules/router';
import {Url} from '../constants/constants';
import {BoardStore, DispatcherAction, Users} from '../modules/types';

export default new (class Board extends Store {
	_data: {
		board: BoardStore,
		validation: {
			errorMsg: string,
		}
	};

	/**
	 * @constructor
	 */
	constructor() {
		super('Board', {
			board: null,
			validation: {
				errorMsg: null,
			},
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
		case BoardActions.moveList:
			await this._moveList(action);
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
		case BoardActions.findUsers:
			await this._findUsers(action);
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
			this._data.board.Lists.forEach((el, i) => {
				el.position = i + 1;
			});
			break;
		}

		this._publish(Events.boardUpdate);
	}

	/**
	 * Перемещение листа
	 * @param {DispatcherAction} action
	 */
	async _moveList(action: DispatcherAction) {
		const list = this._data.board.Lists[action.data.old];
		this._data.board.Lists.splice(action.data.old, 1);
		this._data.board.Lists.splice(action.data.new - 1, 0, list);
		this._data.board.Lists.forEach((el, i) => {
			el.position = i + 1;
		});

		this._publish(Events.boardUpdate);

		await ajaxMethods.moveList({id: action.id, body: {position: action.data.new}});
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
			this._data.board.Lists.forEach((el, i) => {
				el.position = i + 1;
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
	 * Поиск пользователей
	 * @param {DispatcherAction} action
	 */
	async _findUsers(action: DispatcherAction) {
		let isAlredyAdd = false;

		this._data.board.Users.map((user) => {
			if (user.username === action.data) {
				this._data.validation.errorMsg = 'Пользователь уже добавлен';
				this._publish(Events.boardError);
				isAlredyAdd = true;
			}
		});

		if (isAlredyAdd) {
			return;
		}

		const res = await ajaxMethods.findUsers({body: {username: action.data}});

		switch (res.status) {
		case ResponseStatus.success:
			if (res.body.length === 0) {
				this._data.validation.errorMsg = 'Такого пользователя не существует';
				this._publish(Events.boardError);
			} else {
				this._data.board.Users.push(res.body);

				this._publish(Events.boardUpdate);

				await ajaxMethods.addUser({id: this._data.board.idb, body: res.body[0].idu});
			}
			break;
		}
	}

	/**
	 * Получение title
	 * @return {string}
	 */
	getUsers(): Users {
		return this._data.board.Users;
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
