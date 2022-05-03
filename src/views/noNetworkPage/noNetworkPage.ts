import noNetworkPageTemp from './noNetworkPage.hbs';
import BaseView from '../baseView';

/**
 * Класс, реализующий страницу логина.
 */
export default new (class NoNetworkPage extends BaseView {
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
		const html = noNetworkPageTemp({});

		/* Создание контейнера для вставки в DOM */
		document.body.innerHTML = '';
		const container = document.createElement('div');
		container.className = 'container';
		document.body.appendChild(container);
		document.getElementsByClassName('container')[0].innerHTML += html;
	}
});
