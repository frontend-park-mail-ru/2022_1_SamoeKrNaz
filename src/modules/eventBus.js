/**
 * Синглтон, реализующий подписки на обновления сторов
 */
class EventBus {
	/**
	 * @constructor
	 */
	constructor() {
		this._events = new Map();
		this._i = 0;
	};

	/**
	 * Подписка на события в шине
	 * @param {string} event событие, на которое подписаться
	 * @param {object} callback функция, которую будет вызывать шина
	 * @return {function(): void} функция, удаляющая подписку на событие
	 */
	subscribe(event, callback) {
		const eventMap = this._events.get(event);
		const id = this._i++;

		if (eventMap === undefined) {
			this._events.set(event, new Map([
				[id, callback],
			]));
		} else {
			eventMap.set(id, callback);
		}

		return function() {
			eventMap.delete(id);
		};
	}

	/**
	 * Метод, вызывающий события в шине
	 * @param {string} event название события
	 * @param {object} arg данные, которые передаются в callback
	 */
	publish(event, arg) {
		const eventMap = this._events.get(event);

		if (eventMap !== undefined) {
			eventMap.forEach((action) => action(arg));
		}
	}
}

export default new EventBus();
