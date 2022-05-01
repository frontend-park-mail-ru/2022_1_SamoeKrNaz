// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './noNetworkPage.templ.js' or i... Remove this comment to see the full error message
import * as render from './noNetworkPage.templ.js';
import BaseView from '../baseView.js';

/**
 * Класс, реализующий страницу логина.
 */
export default new (class NoNetworkPage extends BaseView {
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
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Handlebars'.
		Handlebars.registerPartial('decoration', Handlebars.templates['decoration']);
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Handlebars'.
		Handlebars.registerPartial('noNetworkBlock', Handlebars.templates['noNetworkBlock']);

		/* Рендер шаблона с входными данными */
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Handlebars'.
		const noNetwork = Handlebars.templates.noNetworkPage;
		const html = noNetwork({});

		/* Создание контейнера для вставки в DOM */
		document.body.innerHTML = '';
		const container = document.createElement('div');
		container.className = 'container';
		document.body.appendChild(container);
		document.getElementsByClassName('container')[0].innerHTML += html;
	}
});
