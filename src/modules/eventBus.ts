/**
 * Синглтон, реализующий подписки на обновления сторов
 */
class EventBus {
	/**
	 * @constructor
	 */
	constructor() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_events' does not exist on type 'EventBu... Remove this comment to see the full error message
		this._events = new Map();
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_i' does not exist on type 'EventBus'.
		this._i = 0;
	}

	/**
	 * Подписка на события в шине
	 * @param {string} event событие, на которое подписаться
	 * @param {object} callback функция, которую будет вызывать шина
	 * @return {function(): void} функция, удаляющая подписку на событие
	 */
	subscribe(event, callback) {
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_events' does not exist on type 'EventBu... Remove this comment to see the full error message
		const eventMap = this._events.get(event);
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_i' does not exist on type 'EventBus'.
		const id = this._i++;

		if (eventMap === undefined) {
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_events' does not exist on type 'EventBu... Remove this comment to see the full error message
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
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_events' does not exist on type 'EventBu... Remove this comment to see the full error message
		const eventMap = this._events.get(event);

		if (eventMap !== undefined) {
			eventMap.forEach((action) => action(arg));
		}
	}
}

export default new EventBus();
