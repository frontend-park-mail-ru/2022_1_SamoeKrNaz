import Store from './baseStore';
import {BoardsActions, Events, ProfileActions} from '../modules/actions';
import {ajaxMethods} from '../ajax/boards';
import {Messages, ResponseStatus, Url} from '../constants/constants';
import router from '../modules/router';

export default new (class Boards extends Store {
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
	 * @param {object} action событие
	 */
	async _callback(action) {
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
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Boards'.
			this._data.boards = res.body;
			break;

		default:
			console.error('Что-то пошло не по плану');
		}


		this._publish(Events.boardsUpdate);
	}

	/**
	 * Метод реализующий загрузку досок пользователя
	 * @param {object} data информация о событии
	 */
	async _createBoard(data) {
		if (data.title.length === 0 || data.title.length >= 30) {
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Boards'.
			this._data.validation.errorMsg = Messages.shortTitle;
			this._publish(Events.boardsCreateError);
			return false;
		}

		const payload = {
			title: data.title,
		};

		if (data.description.length !== 0) {
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'description' does not exist on type '{ t... Remove this comment to see the full error message
			payload.description = data.description;
		}

		const res = await ajaxMethods.createBoard(payload);

		switch (res.status) {
		case ResponseStatus.created:
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Boards'.
			this._data.boards?.push(res.body);
			break;

		default:
			console.error('Что-то пошло не по плану');
		}

		router.open(Url.base);
		this._publish(Events.boardsUpdate);
	}
});
