import Dispatcher from '../modules/dispatcher';
import EventBus from '../modules/eventBus';

/**
 * Базовый класс стора, от которого будут наследоваться все остальные сторы
 */
class Store {
	/**
	 * @constructor
	 * @param {string} name название события
	 * @param {object} data состояние стора
	 */
	constructor(name, data) {
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Store'.
		this._data = data;
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_name' does not exist on type 'Store'.
		this._name = name;
		console.log(name)
		Dispatcher.register(this._callback.bind(this));
	}

	/**
	 * Фукнция, которую переопределяют в субклассах, чтобы передавать в диспетчер
	 * @param {object} action событие
	 */
	_callback(action) {
		console.error('Нужно переопределить метод в классе');
	}

	/**
	 * Метод, с помощью которого можно опубликовать события для обновления
	 * сторов. Она формирует название с названием стора и передает состояние хранилища
	 * @param {string} event название события
	 */
	_publish(event) {
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_data' does not exist on type 'Store'.
		EventBus.publish(event, this._data);
	}
}

export default Store;
