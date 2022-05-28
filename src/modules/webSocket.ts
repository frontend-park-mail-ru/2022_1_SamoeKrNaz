import {backendUrl, WSMsg} from '../constants/constants';
import {MsgData} from '../modules/types';
import Board from '../stores/board';
import Task from '../stores/task';
import Dispatcher from '../modules/dispatcher';
import {BoardActions, TaskActions, Events} from '../modules/actions';
import Router from '../modules/router';
import BoardPage from '../views/boardPage/boardPage';
import EventBus from '../modules/eventBus';

/**
 * Класс, отвечающий за создание, закрытие и обработку событий на websocket
 */
export default new class Socket {
	private socket: WebSocket;

	/**
	 * Конструктор, вызывающий метод открытия соединения с сервером
	 */
	constructor() {

	}

	/**
	 * Метод, инициирующий соединения вебсокета с сервером
	 */
	start() {
		this.socket = new WebSocket(`ws${backendUrl.replace('http', '')}api/ws`);

		this.socket.onopen = this.open;
		this.socket.onmessage = this.msg.bind(this);
	}

	/**
	 * Метод, инициирующий соединения вебсокета с сервером
	 */
	close() {
		this.socket.close();
	}

	/**
	 * Обработка успешного открытия соединения
	 */
	private open(e: Event):void {
		console.log('Соединение с вебсокетом успешно установлено:', e);
	}

	/**
	 * Обработка успешного открытия соединения
	 */
	private msg(e): void {
		const msg: MsgData = JSON.parse(e.data);

		console.log(msg)

		switch (msg.event_type) {
		case WSMsg.updateTask:
			this.updateTask(msg);
		case WSMsg.deleteTask:
			this.deleteTask(msg);
		case WSMsg.updateBoard:
			this.updateBoard(msg);
			break;
		}
	}

	/**
	 * Обработка успешного открытия соединения
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
	 */
	private deleteTask(msg: MsgData): void {
		if (Task.getId() === msg.id_t && Router.getView() === BoardPage) {
			EventBus.publish(Events.taskDelete, {});
		}
	}
}
