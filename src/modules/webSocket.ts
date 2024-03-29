import {backendUrl, WSMsg, NotificationTypes} from '../constants/constants';
import {MsgData} from '../modules/types';
import Board from '../stores/board';
import Task from '../stores/task';
import Dispatcher from '../modules/dispatcher';
import {BoardActions, TaskActions, Events, NotificationActions} from '../modules/actions';
import Router from '../modules/router';
import BoardPage from '../views/boardPage/boardPage';
import EventBus from '../modules/eventBus';

/**
 * Класс, отвечающий за создание, закрытие и обработку событий на websocket
 */
export default new class Socket {
	private socket: WebSocket;
	private state: boolean;
	private notifyAudio: HTMLAudioElement;

	/**
	 * Конструктор, который загружает звуковой файл
	 * @constructor
	 */
	constructor() {
		this.notifyAudio = new Audio('../img/notification.mp3');
	}

	/**
	 * Метод, инициирующий соединения вебсокета с сервером
	 */
	start() {
		this.state = true;
		this.socket = new WebSocket(`ws${backendUrl.replace('http', '')}api/ws`);

		this.socket.onopen = this.open;
		this.socket.onmessage = this.msg.bind(this);
		this.socket.onclose = this.onClose.bind(this);
		this.socket.onerror = (error) => {
			console.error(`[error] ${error}`);
		};
	}

	/**
	 * Метод, инициирующий соединения вебсокета с сервером
	 */
	close() {
		this.state = false;
		this.socket.close();
	}

	/**
	 * Метод, инициирующий соединения вебсокета с сервером
	 */
	onClose() {
		console.log('Соединение с сервером по вебсокету ВСЕ!!!!!');
		if (this.state) {
			setTimeout(this.start.bind(this), 100);
		}
	}

	/**
	 * Обработка успешного открытия соединения
	 * @param {Event} e
	 */
	private open(e: Event):void {
		console.log('Соединение с вебсокетом успешно установлено:', e);
	}

	/**
	 * Обработка успешного открытия соединения
	 * @param {Event} e
	 */
	private msg(e): void {
		const msg: MsgData = JSON.parse(e.data);

		console.log('Пришло сообщение от сервера:', msg);

		switch (msg.event_type) {
		case WSMsg.deleteTask:
			this.deleteTask(msg);
		case WSMsg.updateTask:
			this.updateTask(msg);
		case WSMsg.updateBoard:
			this.updateBoard(msg);
			break;
		case NotificationTypes.deleteFromBoard:
		case NotificationTypes.appendToTask:
		case NotificationTypes.deleteFromTask:
		case NotificationTypes.inviteUser:
		case NotificationTypes.appendToBoard:
			this.notification();
			break;
		}
	}

	/**
	 * Обработка успешного открытия соединения
	 * @param {MsgData} msg
	 */
	private updateBoard(msg: MsgData): void {
		if (Board.getId() === msg.id_b && Router.getView() === BoardPage) {
			Dispatcher.dispatch({
				type: BoardActions.loadBoard,
			});
		}
	}

	/**
	 * Обработка успешного открытия соединения
	 * @param {MsgData} msg
	 */
	private updateTask(msg: MsgData): void {
		if (Task.getId() === msg.id_t && Router.getView() === BoardPage) {
			Dispatcher.dispatch({
				type: TaskActions.updateTask,
			});
		}
	}

	/**
	 * Обработка успешного открытия соединения
	 * @param {MsgData} msg
	 */
	private deleteTask(msg: MsgData): void {
		if (Task.getId() === msg.id_t && Router.getView() === BoardPage) {
			EventBus.publish(Events.taskDelete, {});
		}
	}

	/**
	 * Обработка прихода новой таски
	 */
	private notification(): void {
		this.notifyAudio.play();

		Dispatcher.dispatch({
			type: NotificationActions.loadNotifications,
		});
	}
};
