import Store from './baseStore';
import {ProfileActions, ProfileEvents, TaskActions, Events} from '../modules/actions';
import {Messages, ResponseStatus, Url} from '../constants/constants';
import {ajaxMethods} from '../ajax/task';
import router from '../modules/router';
import {DispatcherAction, ProfileStore, TaskStore} from '../modules/types';
import Dispatcher from '../modules/dispatcher';

/**
 * Класс реализующий стор для профиля пользователя
 */
class Task extends Store {
	_data: TaskStore;

	/**
	 * @constructor
	 */
	constructor() {
		super('Task', {
			title: null,
		});
	}

	/**
	 * Метод, который переопределяют в субклассах, чтобы передавать в диспетчер
	 * @param {DispatcherAction} action событие
	 */
	async _callback(action: DispatcherAction) {
		switch (action.type) {
		case TaskActions.loadTask:
			await this._loadTask(action);
			break;
		case TaskActions.updateTitle:
			await this._updateTitle(action);
			break;
		case TaskActions.addUser:
			await this._addUser(action);
			break;
		case TaskActions.removeUser:
			await this._removeUser(action);
			break;
		case TaskActions.changeDate:
			await this._changeDate(action);
			break;
		case TaskActions.changeDescription:
			await this._changeDescription(action);
			break;
		case TaskActions.addChecklist:
			await this._addChecklist(action);
			break;
		case TaskActions.addItem:
			await this._addItem(action);
			break;
		case TaskActions.removeChecklist:
			await this._removeChecklist(action);
			break;
		case TaskActions.removeItem:
			await this._removeItem(action);
			break;
		case TaskActions.checkItem:
			await this._checkItem(action);
			break;
		case TaskActions.changeCheckList:
			await this._changeCheckList(action);
			break;
		case TaskActions.changeCheckListTitle:
			await this._changeCheckListTitle(action);
			break;
		}
	}

	/**
	 * Получение и обработка информации о профиле пользователя
	 * @param {DispatcherAction} action
	 */
	async _loadTask(action: DispatcherAction) {
		const res = await ajaxMethods.loadTask({id: action.data});

		switch (res.status) {
		case ResponseStatus.success:
			this._data = res.body;
			break;
		}

		this._publish(Events.taskUpdate);
	}

	/**
	 * Обновление title таски
	 * @param {DispatcherAction} action
	 */
	async _updateTitle(action: DispatcherAction) {
		const res = await ajaxMethods.updateTitle({id: this._data.idt, body: {title: action.title}});

		this._data.title = action.title;
	}

	/**
	 * Обновление описания таски
	 * @param {DispatcherAction} action
	 */
	async _changeDescription(action: DispatcherAction) {
		const res = await ajaxMethods.changeDescription({id: this._data.idt, body: {description: action.data}});

		this._data.description = action.data;
	}

	/**
	 * Добавление чек-листа
	 * @param {DispatcherAction} action
	 */
	async _addChecklist(action: DispatcherAction) {
		const res = await ajaxMethods.addChecklist({id: this._data.idt, body: {title: 'Введите чек-листа название тут'}});

		switch (res.status) {
		case ResponseStatus.success:
			res.body.CheckListItems = [];
			this._data.checkList.push(res.body);
			break;
		}

		this._publish(Events.taskUpdate);
	}

	/**
	 * Добавление итема чек-листа
	 * @param {DispatcherAction} action
	 */
	async _addItem(action: DispatcherAction) {
		const res = await ajaxMethods.addItem({id: action.id, body: {id_t: this._data.idt, title: 'Введите название тут'}});

		switch (res.status) {
		case ResponseStatus.success:
			this._data.checkList.map((list) => {
				if (list.id_cl === Number(action.id)) {
					list.CheckListItems.push(res.body);
				}
			});
			break;
		}

		this._publish(Events.taskUpdate);
	}

	/**
	 * Удаление чек-листа
	 * @param {DispatcherAction} action
	 */
	async _removeChecklist(action: DispatcherAction) {
		const res = await ajaxMethods.removeChecklist({id: action.id});

		switch (res.status) {
		case ResponseStatus.success:
			this._data.checkList.forEach((list, i) => {
				if (list.id_cl === Number(action.id)) {
					this._data.checkList.splice(i, 1);
				}
			});
			break;
		}

		this._publish(Events.taskUpdate);
	}

	/**
	 * Удаление item чек-листа
	 * @param {DispatcherAction} action
	 */
	async _removeItem(action: DispatcherAction) {
		const res = await ajaxMethods.removeItem({id: action.id});

		switch (res.status) {
		case ResponseStatus.success:
			this._data.checkList.map((list, i) => {
				list.CheckListItems.forEach((item, i) => {
					if (item.id_clit === Number(action.id)) {
						list.CheckListItems.splice(i, 1);
					}
				});
			});
			break;
		}

		this._publish(Events.taskUpdate);
	}

	/**
	 * Смена чекбокса
	 * @param {DispatcherAction} action
	 */
	async _checkItem(action: DispatcherAction) {
		let state: boolean;

		this._data.checkList.map((list, i) => {
			list.CheckListItems.forEach((item, i) => {
				if (item.id_clit === Number(action.id)) {
					state = !item.isready;
					item.isready = state;
				}
			});
		});

		const res = await ajaxMethods.checkItem({id: action.id, body: {isready: state, id_t: this._data.idt}});

		this._publish(Events.taskUpdate);
	}

	/**
	 * Смена чекбокса
	 * @param {DispatcherAction} action
	 */
	async _changeCheckList(action: DispatcherAction) {
		const res = await ajaxMethods.changeCheckList({id: action.id, body: {title: action.title, id_t: this._data.idt}});

		switch (res.status) {
		case ResponseStatus.created:
			this._data.checkList.map((list) => {
				list.CheckListItems.forEach((item, i) => {
					if (item.id_clit === Number(action.id)) {
						item.title = action.title;
					}
				});
			});
			break;
		}

		this._publish(Events.taskUpdate);
	}

	/**
	 * Смена чекбокса
	 * @param {DispatcherAction} action
	 */
	async _changeCheckListTitle(action: DispatcherAction) {
		const res = await ajaxMethods.changeCheckListTitle({id: action.id, body: {title: action.title, id_t: this._data.idt}});

		switch (res.status) {
		case ResponseStatus.created:
			this._data.checkList.map((list) => {
				if (list.id_cl === Number(action.id)) {
					list.title = action.title;
				}
			});
			break;
		}

		this._publish(Events.taskUpdate);
	}

	/**
	 * Обновление юзера на таску
	 * @param {DispatcherAction} action
	 */
	async _addUser(action: DispatcherAction) {
		const res = await ajaxMethods.addUser({id: this._data.idt, body: {idu: action.id}});

		switch (res.status) {
		case ResponseStatus.success:
			this._data.append_users.push(res.body);
			break;
		}

		this._publish(Events.taskUpdate);
	}

	/**
	 * Удаление юзера с таски
	 * @param {DispatcherAction} action
	 */
	async _removeUser(action: DispatcherAction) {
		const res = await ajaxMethods.removeUser({id: this._data.idt, body: {idu: action.id}});

		switch (res.status) {
		case ResponseStatus.success:
			this._data.append_users.forEach((user, i) => {
				if (user.idu === Number(action.id)) {
					this._data.append_users.splice(i, 1);
				}
			});
			break;
		}

		this._publish(Events.taskUpdate);
	}

	/**
	 * Изменение даты на таске
	 * @param {DispatcherAction} action
	 */
	async _changeDate(action: DispatcherAction) {
		const res = await ajaxMethods.changeDate({id: this._data.idt, body: {deadline: action.data}});
	}

	/**
	 * Получить состояние пользователя
	 * @return {object}
	 */
	getState() {
		return this._data;
	}
}

export default new Task();
