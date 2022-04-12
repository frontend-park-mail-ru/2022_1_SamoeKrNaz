'use strict';

import Store from './baseStore.js';
import {BoardsActions, Events, ProfileActions} from '../modules/actions.js';
import {ajaxMethods} from '../ajax/boards.js';
import {ResponseStatus} from '../constants/constants.js';

export default new class Boards extends Store {
	/**
	 * @constructor
	 */
	constructor() {
		super('Boards', {
			boards: undefined,
		});
	}

	/**
	 * Метод, который переопределяют в субклассах, чтобы передавать в диспетчер
	 * @param {object} action событие
	 */
	async _callback(action) {
		switch (action.type) {
		case BoardsActions.loadBoards:
			await this._loadBoards();
			break;
		}
	}

	/**
	 * Метод реализующий загрузку досок пользователя
	 */
	async _loadBoards() {
		const res = await ajaxMethods.loadBoards();

		switch (res.status) {
		case ResponseStatus.success:
			this._data.boards = res.body;
			break;

		default:
			console.error('Что-то пошло не по плану');
		}


		this._publish(Events.boardsUpdate);
	}
};
