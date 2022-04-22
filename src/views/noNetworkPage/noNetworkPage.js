import * as render from './noNetworkPage.templ.js';
import BaseView from '../baseView.js';

/**
 * Класс, реализующий страницу логина.
 */
export default new class NoNetworkPage extends BaseView {
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
		Handlebars.registerPartial('noNetworkBlock', Handlebars.templates['noNetworkBlock']);

		/* Рендер шаблона с входными данными */
		const noNetwork = Handlebars.templates.noNetworkPage;
		const html = noNetwork({});

		/* Создание контейнера для вставки в DOM */
		document.body.innerHTML = '';
		const container = document.createElement('div');
		container.className = 'container';
		document.body.appendChild(container);
		document.getElementsByClassName('container')[0].innerHTML += html;
	}
};
