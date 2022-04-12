'use strict';

import Store from './baseStore.js';
import {BoardsActions, Events, ProfileActions} from '../modules/actions.js';
import {ajaxMethods} from '../ajax/boards.js';
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
		case BoardsActions.loadBoard:
			await this._loadBoard(action);
			break;
		}
	}

	/**
	 * Загрузка в стор информации
	 */
	async _loadBoard() {

	}
};
