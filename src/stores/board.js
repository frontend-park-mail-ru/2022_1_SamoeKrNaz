'use strict';

import Store from './baseStore.js';
import {BoardActions, BoardsActions, Events, ProfileActions, ProfileEvents} from '../modules/actions.js';
import {ajaxMethods} from '../ajax/board.js';
import {Messages, ResponseStatus} from '../constants/constants.js';
import router from '../modules/router.js';

export default new class Board extends Store {
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

					this._publish(Events.boardUpdate);
			}
	}
};
