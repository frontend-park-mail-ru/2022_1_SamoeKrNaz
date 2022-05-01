import Store from './baseStore.js';
import {BoardActions, BoardsActions, Events, ProfileActions, ProfileEvents} from '../modules/actions.js';
import {ajaxMethods} from '../ajax/board.js';
import {Messages, ResponseStatus} from '../constants/constants.js';
import router from '../modules/router.js';
import {Url} from '../constants/constants.js';

export default new (class Board extends Store {
	/**
	 * @constructor
	 */
	constructor() {
		super('Boards', {
			board: null,
		});
	}

	/**
	 * Метод, который переопределяют в субклассах, чтобы передавать в диспетчер
	 * @param {object} action событие
	 */
	async _callback(action) {
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
	// @ts-expect-error ts-migrate(2705) FIXME: An async function or method in ES5/ES3 requires th... Remove this comment to see the full error message
	async _loadBoard() {
		const res = await ajaxMethods.loadBoard(window.location.pathname.split('/').pop());

		switch (res.status) {
		case ResponseStatus.success:
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
			this._data.board = res.body;
			break;
		case ResponseStatus.forbidden:
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
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
	 * @param {object} action
	 */
	// @ts-expect-error ts-migrate(2705) FIXME: An async function or method in ES5/ES3 requires th... Remove this comment to see the full error message
	async _createList(action) {
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
		const res = await ajaxMethods.createList({id: this._data.board.idb, body: action.body});

		switch (res.status) {
		case ResponseStatus.success:
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
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
	 * @param {object} action
	 */
	// @ts-expect-error ts-migrate(2705) FIXME: An async function or method in ES5/ES3 requires th... Remove this comment to see the full error message
	async _updateBoard(action) {
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
		const res = await ajaxMethods.updateBoard({id: this._data.board.idb, body: action.body});

		switch (res.status) {
		case ResponseStatus.noContent:
		case ResponseStatus.created:
		case ResponseStatus.success:
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
			this._data.board.title = action.body.title;
			break;
		}

		this._publish(Events.boardUpdate);
	}

	/**
	 * Загрузка в стор информации
	 * @param {object} action
	 */
	// @ts-expect-error ts-migrate(2705) FIXME: An async function or method in ES5/ES3 requires th... Remove this comment to see the full error message
	async _addTask(action) {
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
		const res = await ajaxMethods.addTask({idb: this._data.board.idb, idl: action.id, body: action.body});

		switch (res.status) {
		case ResponseStatus.noContent:
		case ResponseStatus.created:
		case ResponseStatus.success:
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
			this._data.board.Lists.map((list) => {
				if (list.idl === Number(action.id)) {
					list.Tasks.push(res.body);
				}
			});
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
			console.log(this._data);
			break;
		}

		this._publish(Events.boardUpdate);
	}

	/**
	 * Загрузка в стор информации
	 */
	// @ts-expect-error ts-migrate(2705) FIXME: An async function or method in ES5/ES3 requires th... Remove this comment to see the full error message
	async _deleteDesk() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
		const res = await ajaxMethods.deleteDesk({id: this._data.board.idb});

		switch (res.status) {
		case ResponseStatus.success:
			router.open(Url.base);
			break;
		}
	}

	/**
	 * Загрузка в стор информации
	 * @param {object} action
	 */
	// @ts-expect-error ts-migrate(2705) FIXME: An async function or method in ES5/ES3 requires th... Remove this comment to see the full error message
	async _deleteList(action) {
		const res = await ajaxMethods.deleteList({id: action.id});

		switch (res.status) {
		case ResponseStatus.success:
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
			this._data.board.Lists.forEach((list, i) => {
				if (list.idl === Number(action.id)) {
					// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
					delete this._data.board.Lists[i];
				}
			});
			break;
		}

		this._publish(Events.boardUpdate);
	}

	/**
	 * Загрузка в стор информации
	 * @param {object} action
	 */
	// @ts-expect-error ts-migrate(2705) FIXME: An async function or method in ES5/ES3 requires th... Remove this comment to see the full error message
	async _updateList(action) {
		console.log(action);
		const res = await ajaxMethods.updateList({id: action.id, body: action.body});

		switch (res.status) {
		case ResponseStatus.created:
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
			this._data.board.Lists.forEach((list, i) => {
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
	 * @param {object} action
	 */
	// @ts-expect-error ts-migrate(2705) FIXME: An async function or method in ES5/ES3 requires th... Remove this comment to see the full error message
	async _updateTask(action) {
		console.log(action);
		const res = await ajaxMethods.updateTask({id: action.id, body: action.body});

		switch (res.status) {
		case ResponseStatus.created:
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
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
	 * @param {object} action
	 */
	// @ts-expect-error ts-migrate(2705) FIXME: An async function or method in ES5/ES3 requires th... Remove this comment to see the full error message
	async _deleteTask(action) {
		const res = await ajaxMethods.deleteTask({id: action.id});

		switch (res.status) {
		case ResponseStatus.success:
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
			this._data.board.Lists.forEach((list, j) => {
				list.Tasks.forEach((task, i) => {
					if (task.idt === Number(action.id)) {
						// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
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
	getTitle() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
		return this._data.board.title;
	}

	/**
	 * Получение title
	 * @return {string}
	 */
	getDescription() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Board'.
		return this._data.board.description;
	}
});
