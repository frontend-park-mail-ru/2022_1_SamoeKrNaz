import Store from './baseStore';
import {NotificationActions, Events} from '../modules/actions';
import {ajaxMethods} from '../ajax/notifications';
import {Messages, ResponseStatus, Url} from '../constants/constants';
import router from '../modules/router';
import Dispatcher from '../modules/dispatcher';
import {Notifications, DispatcherAction} from '../modules/types';
import NotificationPage from '../views/notification/notification';

export default new (class Notification extends Store {
	_data: {
		notification: Notifications,
	};

	/**
	 * @constructor
	 */
	constructor() {
		super('Boards', {
			notification: null,
		});
	}

	/**
	 * Метод, который переопределяют в субклассах, чтобы передавать в диспетчер
	 * @param {DispatcherAction} action событие
	 */
	async _callback(action: DispatcherAction) {
		switch (action.type) {
			case NotificationActions.loadNotifications:
				await this._loadNotifications();
				break;
			case NotificationActions.readAll:
				await this._readAll();
				break;
		}
	}

	/**
	 * Метод реализующий загрузку досок пользователя
	 */
	private async _loadNotifications() {
		const res = await ajaxMethods.loadNotifications();

		switch (res.status) {
			case ResponseStatus.success:
				this._data.notification = res.body.slice(0, 10);
				break;

			default:
				console.error('Что-то пошло не по плану');
		}

		if (router.getView() === NotificationPage) {
			this._publish(Events.notificationUpdate);

			Dispatcher.dispatch({
				type: NotificationActions.readAll,
			});
		} else {
			this.switchIcon();
		}
	}

	/**
	 * Метод реализующий загрузку досок пользователя
	 */
	private async _readAll() {
		const res = await ajaxMethods.readAll();

		switch (res.status) {
			case ResponseStatus.success:
				this._data.notification?.map((el) => {
					el.is_read = true;
				});

				this.switchIcon();
				break;
			default:
				console.error('Что-то пошло не по плану');
		}
	}

	/**
	 * Проверить наличие непроверенных уведомлений
	 */
	private switchIcon() {
		this._publish(Events.switchNotificationIcon);
	}

	/**
	 * Получить состояние уведомлений
	 */
	getState() {
		return this._data;
	}
});
