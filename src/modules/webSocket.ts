import {backendUrl} from '../constants/constants';

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
		this.socket.onmessage = this.msg;
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
	private msg(e):void {
		console.log('Получено сообщение:', e.data);
	}
}
