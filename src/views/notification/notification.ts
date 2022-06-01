import notification from './notification.hbs';
import BaseView from '../baseView';
import BasePage from '../basePage/basePage';
import EventBus from '../../modules/eventBus';
import {BoardsActions, Events} from '../../modules/actions';
import Dispatcher from '../../modules/dispatcher';
import Notification from '../../stores/notification';

/**
 * Класс, реализующий страницу списка досок
 */
export default new (class NotificationPage extends BaseView {
	/**
	 * @constructor
	 */
	constructor() {
		super([]);
	}

	/**
	 * Метод отвечающий за генерацию View
	 */
	render() {
		BasePage.render();

		this.onUpdate(Notification.getState());
	}

	/**
	 * Метод, вызывающийся при обновлении стора досок
	 * @param {object} data состояние стора
	 */
	onUpdate(data = {notification: undefined}) {
		this.removeListeners();

		console.log(data);

		const root = document.getElementById('root');

		root.innerHTML = notification({
			pageStatus: BasePage.pageStatus,
			notification: data.notification,
		});

		this._createListeners();
	}
});
