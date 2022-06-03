import Dispatcher from '../modules/dispatcher';
import EventBus from '../modules/eventBus';
import {DispatcherAction} from '../modules/types';
import {Events} from '../modules/actions';

/**
 * Базовый класс стора, от которого будут наследоваться все остальные сторы
 */
class Store {
	_data: any;
	_name: string;

	/**
	 * @constructor
	 * @param {string} name название события
	 * @param {any} data состояние стора
	 */
	constructor(name: string, data: any) {
		this._data = data;
		this._name = name;

		Dispatcher.register(this._callback.bind(this));
	}

	/**
	 * Фукнция, которую переопределяют в субклассах, чтобы передавать в диспетчер
	 * @param {DispatcherAction} action
	 */
	_callback(action: DispatcherAction) {
		console.error('Нужно переопределить метод в классе');
	}

	/**
	 * Метод, с помощью которого можно опубликовать события для обновления
	 * сторов. Она формирует название с названием стора и передает состояние хранилища
	 * @param {string} event название события
	 */
	_publish(event: string) {
		EventBus.publish(event, this._data);
	}

	/**
	 * Визуальный запуск лоадера
	 */
	startLoader() {
		EventBus.publish(Events.startLoader, this._data);
	}

	/**
	 * Визуальный запуск лоадера
	 */
	stopLoader() {
		EventBus.publish(Events.stopLoader, this._data);
	}
}

export default Store;
