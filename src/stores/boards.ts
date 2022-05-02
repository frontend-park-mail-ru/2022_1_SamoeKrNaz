import Store from './baseStore';
import {BoardsActions, Events, ProfileActions} from '../modules/actions';
import {ajaxMethods} from '../ajax/boards';
import {Messages, ResponseStatus, Url} from '../constants/constants';
import router from '../modules/router';
import {DispatcherAction} from '../modules/types';

export default new (class Boards extends Store {
	_data: {
		boards: Array<any>,

		validation: {
			errorMsg: string,
		},
	};

	/**
	 * @constructor
	 */
	constructor() {
		super('Boards', {
			boards: null,

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
		case BoardsActions.loadBoards:
			await this._loadBoards();
			break;
		case BoardsActions.createBoard:
			await this._createBoard(action);
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

	/**
	 * Метод реализующий загрузку досок пользователя
	 * @param {DispatcherAction} data информация о событии
	 */
	async _createBoard(data: DispatcherAction) {
		if (data.title.length === 0 || data.title.length >= 30) {
			this._data.validation.errorMsg = Messages.shortTitle;
			this._publish(Events.boardsCreateError);
			return false;
		}

		const payload = {
			title: data.title,
			description: null,
		};

		if (data.description.length !== 0) {
			payload.description = data.description;
		}

		const res = await ajaxMethods.createBoard(payload);

		switch (res.status) {
		case ResponseStatus.created:
			this._data.boards?.push(res.body);
			break;

		default:
			console.error('Что-то пошло не по плану');
		}

		router.open(Url.base);
		this._publish(Events.boardsUpdate);
	}
});
