import notFoundPageTemp from './notFoundPage.hbs';
import BaseView from '../baseView';

/**
 * Класс, реализующий страницу логина.
 */
export default new (class NotFoundPage extends BaseView {
	/**
	 * @constructor
	 */
	constructor() {
		super([
		]);
	}

	/**
	 * Метод отвечающий за генерацию View
	 * @param {object} data данные, на основе которых будет формироваться страница
	 */
	render(data = null) {
		const html = notFoundPageTemp({});

		/* Создание контейнера для вставки в DOM */
		document.body.innerHTML = '';
		const container = document.createElement('div');
		container.className = 'container';
		document.body.appendChild(container);
		document.getElementsByClassName('container')[0].innerHTML += html;
	}
});
