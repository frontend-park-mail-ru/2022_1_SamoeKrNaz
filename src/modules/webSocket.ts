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
	 * Метод, инициирующий соединения вебсокета с сервером
	 */
	start() {
		this.socket = new WebSocket(`ws${backendUrl.replace('http', '')}api/ws`);

		this.socket.onopen = this.open;
		this.socket.onmessage = this.msg.bind(this);
		this.socket.onclose = function(event) {
			console.log('Соединение с сервером по вебсокету ВСЕ!!!!!');
		}
		this.socket.onerror = function(error) {
			alert(`[error] ${error.message}`);
		};
	}


	/**
	 * Метод, инициирующий соединения вебсокета с сервером
	 */
	close() {
		this.socket.close();
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
};
