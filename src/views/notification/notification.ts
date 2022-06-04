import notification from './notification.hbs';
import BaseView from '../baseView';
import BasePage from '../basePage/basePage';
import EventBus from '../../modules/eventBus';
import {NotificationActions, Events} from '../../modules/actions';
import Dispatcher from '../../modules/dispatcher';
import Router from '../../modules/router';
import Notification from '../../stores/notification';
import {NotificationTypes} from '../../constants/constants';
import type {NotificationType} from '../../modules/types';

/**
 * Класс, реализующий страницу списка досок
 */
export default new (class NotificationPage extends BaseView {
	/**
	 * @constructor
	 */
	constructor() {
		super([
			{
				type: 'click', // Тип обработчика, который навешивается
				className: 'toggle__block', // Класс, на который навешивается обработчки
				func: () => { // Функция, которая вызывается обработчиком
					BasePage.toggleLeft();
				},
			},
			{
				type: 'click', // Тип обработчика, который навешивается
				className: 'clearNotification', // Класс, на который навешивается обработчки
				isArray: true,
				func: () => { // Функция, которая вызывается обработчиком
					Dispatcher.dispatch({
						type: NotificationActions.clear,
					});
				},
			},
		]);

		EventBus.subscribe(Events.notificationUpdate, this.onUpdate.bind(this));
	}

	/**
	 * Метод отвечающий за генерацию View
	 */
	render() {
		BasePage.render();

		if (Notification.getState().notification != null) {
			Dispatcher.dispatch({
				type: NotificationActions.readAll,
			});
		}

		this.onUpdate(Notification.getState());
	}

	/**
	 * Метод, вызывающийся при обновлении стора досок
	 * @param {object} data состояние стора
	 */
	onUpdate(data = {notification: undefined}) {
		this.removeListeners();

		console.log(data);

		// Форматирование состояния уведомлений, для корректного вывода через hbs
		const notifications = [];

		data.notification?.map((el) => {
			switch (el.notification_type) {
			case NotificationTypes.inviteUser:
				notifications.push(this.formatInviteUser(el));
				break;
			case NotificationTypes.appendToTask:
				notifications.push(this.formatAppendToTask(el));
				break;
			case NotificationTypes.appendToBoard:
				notifications.push(this.formatAppendToBoard(el));
				break;
			case NotificationTypes.deleteFromTask:
				notifications.push(this.formatDeleteFromTask(el));
				break;
			case NotificationTypes.deleteFromBoard:
				notifications.push(this.formatDeleteFromBoard(el));
				break;
			}
		});

		const root = document.getElementById('root');

		root.innerHTML = notification({
			pageStatus: BasePage.pageStatus,
			notification: notifications,
		});

		this._createListeners();
	}

	/**
	 * Форматирование уведомления о добавлении пользователя
	 * @param {NotificationType} notify
	 * @return {object}
	 */
	formatInviteUser(notify: NotificationType) {
		return {
			title: 'Вас пригласили на новую доску!',
			description: `
				<span class="notification__description-black">${notify.date}</span> 
				пользователь 
				<span class="notification__description-black">${notify.user_who.username}</span> 
				пригласил вас на доску 
				<span class="notification__description-black">${notify.board.title}</span>. 
				Нажмите принять приглашение, чтобы присоединиться к доске!
			`,
			isRead: notify.is_read,
			hasButton: true,
			button: `
				<a class="notification__button" href="../boardappend/${notify.board.link}">Принять приглашение</a>
			`,
		};
	}

	/**
	 * Форматирование уведомления о добавлении пользователя
	 * @param {NotificationType} notify
	 * @return {object}
	 */
	formatAppendToTask(notify: NotificationType) {
		return {
			title: 'Вас назначили на карточку!',
			description: `
				<span class="notification__description-black">${notify.date}</span> 
				пользователь 
				<span class="notification__description-black">${notify.user_who.username}</span> 
				назначил вас на карточку 
				<a href="../task/${notify.task.idt}" class="notification__description-black">${notify.task.title}</a>. 
			`,
			isRead: notify.is_read,
			hasButton: false,
			button: null,
		};
	}

	/**
	 * Форматирование уведомления о добавлении пользователя
	 * @param {NotificationType} notify
	 * @return {object}
	 */
	formatAppendToBoard(notify: NotificationType) {
		return {
			title: 'На вашей доске новый пользователь!',
			description: `
				<span class="notification__description-black">${notify.date}</span> 
				пользователь 
				<span class="notification__description-black">${notify.user_who.username}</span> 
				присоединился на вашу доску 
				<a href="../board/${notify.board.idb}" class="notification__description-black">${notify.board.title}</a>.
			`,
			isRead: notify.is_read,
			hasButton: false,
			button: null,
		};
	}

	/**
	 * Форматирование уведомления о удалении пользователя с карточки
	 * @param {NotificationType} notify
	 * @return {object}
	 */
	formatDeleteFromTask(notify: NotificationType) {
		return {
			title: 'Вас удалили с карточки!',
			description: `
				<span class="notification__description-black">${notify.date}</span> 
				пользователь 
				<span class="notification__description-black">${notify.user_who.username}</span> 
				удалил вас с карточки  
				<a href="../task/${notify.task.idt}" class="notification__description-black">${notify.task.title}</a>.
			`,
			isRead: notify.is_read,
			hasButton: false,
			button: null,
		};
	}

	/**
	 * Форматирование уведомления о удалении пользователя с карточки
	 * @param {NotificationType} notify
	 * @return {object}
	 */
	formatDeleteFromBoard(notify: NotificationType) {
		return {
			title: 'Вас удалили с доски!',
			description: `
				<span class="notification__description-black">${notify.date}</span> 
				пользователь 
				<span class="notification__description-black">${notify.user_who.username}</span> 
				удалил вас с доски 
				<span class="notification__description-black">${notify.board.title}</span>.
			`,
			isRead: notify.is_read,
			hasButton: false,
			button: null,
		};
	}
});
