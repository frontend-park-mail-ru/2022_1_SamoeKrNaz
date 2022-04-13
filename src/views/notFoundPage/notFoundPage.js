import * as render from './notFoundPage.templ.js';
import BaseView from '../baseView.js';

/**
 * Класс, реализующий страницу логина.
 */
export default new class NotFoundPage extends BaseView {
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
		/* Регистрация всех компонентов для страницы */
		Handlebars.registerPartial('decoration', Handlebars.templates['decoration']);
		Handlebars.registerPartial('notFoundBlock', Handlebars.templates['notFoundBlock']);

		/* Рендер шаблона с входными данными */
		const notFound = Handlebars.templates.notFoundPage;
		const html = notFound({});

		/* Создание контейнера для вставки в DOM */
		document.body.innerHTML = '';
		const container = document.createElement('div');
		container.className = 'container';
		document.body.appendChild(container);
		document.getElementsByClassName('container')[0].innerHTML += html;
	}
};