'use strict';

import * as render from './basePage.templ.js';
import BaseView from '../baseView.js';
import {Url} from '../../constants/constants.js';
import router from '../../modules/router.js';
import EventBus from '../../modules/eventBus.js';
import {ProfileActions, ProfileEvents} from '../../modules/actions.js';
import Dispatcher from '../../modules/dispatcher.js';
import settingsView from "../settingsView/settingsView.js";
import SettingsView from "../settingsView/settingsView.js";

/**
 * Класс, реализующий страницу логина.
 */
export default new class basePage extends BaseView {
	/**
	 * @constructor
	 */
	constructor() {
		super([
			{
				type: 'click', // Тип обработчика, который навешивается
				className: 'toggle__block', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					document.getElementsByClassName('header')[0].classList.toggle('header_open');
					document.getElementsByClassName('main')[0].classList.toggle('menu-open');
					document.getElementById('search-icon').classList.toggle('toggle__icon_open');
				},
			},
			{
				type: 'click',
				className: 'toggle__block_blue',
				func: (e) => {
					document.getElementsByClassName('main')[0].classList.toggle('active-tasks-open');
					document.getElementsByClassName('active-tasks')[0].classList.toggle('close');
					document.getElementsByClassName('main__cap')[0].classList.toggle('active-close');
					document.getElementById('active-closer').classList.toggle('toggle__icon_open');
				},
			},
		]);
	}

	/**
	 * Метод отвечающий за генерацию View
	 * @param {object} data данные, на основе которых будет формироваться страница
	 */
	render(data = null) {
		/* Регистрация всех компонентов для страницы */
		Handlebars.registerPartial('leftMenu', Handlebars.templates['leftMenu']);
		Handlebars.registerPartial('cap', Handlebars.templates['cap']);
		Handlebars.registerPartial('activeTask', Handlebars.templates['activeTask']);
		Handlebars.registerPartial('containerDesk', Handlebars.templates['containerDesk']);
		Handlebars.registerPartial('rightMenu', Handlebars.templates['rightMenu']);
		Handlebars.registerPartial('settings', Handlebars.templates['settings']);
		Handlebars.registerPartial('success', Handlebars.templates['success']);
		Handlebars.registerPartial('error', Handlebars.templates['error']);

		/* Рендер шаблона с входными данными */
		const basePage = Handlebars.templates.basePage;

		const html = basePage({
			pageStatus: {
				isRightMenu: true,
				isLeftMenu: false,
			},
		});


		/* Добавление контента в DOM */
		document.body.innerHTML = html;
		this._createListeners();
		SettingsView.render();
	}
};
