import Store from './baseStore';
import {ProfileActions, ProfileEvents, TaskActions, Events} from '../modules/actions';
import {backendUrl, frontendUrl, Messages, ResponseStatus, Url} from '../constants/constants';
import {ajaxMethods} from '../ajax/task';
import router from '../modules/router';
import {DispatcherAction, ProfileStore, TaskStore} from '../modules/types';
import Dispatcher from '../modules/dispatcher';
import Profile from './profile';

/**
 * Класс реализующий стор для профиля пользователя
 */
class Task extends Store {
	_data: TaskStore;
	isBlock: boolean;

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
		case TaskActions.updateTask:
			await this._updateTask();
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
		case TaskActions.addComment:
			await this._addComment(action);
			break;
		case TaskActions.changeComment:
			await this._changeComment(action);
			break;
		case TaskActions.deleteComment:
			await this._deleteComment(action);
			break;
		case TaskActions.uploadAttachment:
			await this._uploadAttachment(action);
			break;
		case TaskActions.removeAttachment:
			await this._removeAttachment(action);
			break;
		case TaskActions.downloadAttachment:
			await this._downloadAttachment(action);
			break;
		case TaskActions.blockUpdate:
			this.isBlock = true;
			break;
		case TaskActions.unBlockUpdate:
			this.isBlock = false;
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
			res.body.link = frontendUrl + '/taskappend/' + res.body.link;
			this._data = res.body;
			break;
		}

		this._publish(Events.taskUpdate);
	}

	/**
	 * Получение и обработка информации о таске
	 */
	async _updateTask() {
		const res = await ajaxMethods.loadTask({id: this._data.idt});

		switch (res.status) {
		case ResponseStatus.success:
			res.body.link = frontendUrl + '/taskappend/' + res.body.link;
			this._data = res.body;
			break;
		}

		if (!this.isBlock) {
			this._publish(Events.taskUpdate);
		}
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
	 * Добавление comment чек-листа
	 * @param {DispatcherAction} action
	 */
	async _addComment(action: DispatcherAction) {
		const res = await ajaxMethods.addComment({id: this._data.idt, body: {title: action.title}});

		switch (res.status) {
		case ResponseStatus.success:
			res.body.user.img_avatar = Profile.getState().img;
			res.body.user.username = Profile.getState().username;
			this._data.comment.push(res.body);
			break;
		}

		this._publish(Events.taskUpdate);
	}

	/**
	 * Добавление comment чек-листа
	 * @param {DispatcherAction} action
	 */
	async _changeComment(action: DispatcherAction) {
		const res = await ajaxMethods.changeComment({id: action.id, body: {title: action.title}});

		switch (res.status) {
		case ResponseStatus.created:
			this._data.comment.map((comm) => {
				if (comm.idcm === Number(action.id)) {
					comm.title = action.title;
				}
			});
			break;
		}
	}

	/**
	 * Добавление comment чек-листа
	 * @param {DispatcherAction} action
	 */
	async _deleteComment(action: DispatcherAction) {
		const res = await ajaxMethods.deleteComment({id: action.id});

		switch (res.status) {
		case ResponseStatus.success:
			this._data.comment.forEach((comm, i) => {
				if (comm.idcm === Number(action.id)) {
					this._data.comment.splice(i, 1);
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
	 * Загрузка вложений
	 * @param {DispatcherAction} data
	 */
	async _uploadAttachment(data: DispatcherAction) {
		const formData = new FormData();
		formData.append('attachment', data.data);
		this._data.isExec = false;
		this._data.isLarge = false;
		if (data.data.type === 'application/x-msdownload') {
			this._data.isExec = true;
			this._publish(Events.taskUpdate);
		} else {
			console.log(data.data.type);
			const res = await ajaxMethods.uploadAttachment({id: this._data.idt, opt: formData});
			switch (res.status) {
			case ResponseStatus.success:
				this._data.attachments.push(res.body);
				this._publish(Events.taskUpdate);
				break;
			case ResponseStatus.tooLarge:
				this._data.isLarge = true;
				this._publish(Events.taskUpdate);
				break;
			}
		}
	}

	/**
	 * Удаление вложений
	 * @param {DispatcherAction} action
	 */
	async _removeAttachment(action: DispatcherAction) {
		const res = await ajaxMethods.removeAttachment({id: action.id});
		switch (res.status) {
		case ResponseStatus.success:
			this._data.attachments.forEach((attach, i) => {
				if (attach.id_a === Number(action.id)) {
					this._data.attachments.splice(i, 1);
				}
			});
			break;
		}
		this._publish(Events.taskUpdate);
	}

	/**
	 * Удаление вложений
	 * @param {DispatcherAction} action
	 */
	async _downloadAttachment(action: DispatcherAction) {
		const attachment = this._data.attachments.find((attach) => {
			return attach.id_a === Number(action.id);
		});
		window.open('../' + attachment.system_name + '?name=' + attachment.default_name, `Download: ${attachment.default_name}`);
	}

	/**
	 * Получить состояние пользователя
	 * @return {object}
	 */
	getState() {
		return this._data;
	}

	/**
	 * Получить состояние пользователя
	 * @return {number}
	 */
	getId(): number {
		return this._data.idt;
	}
}

export default new Task();
