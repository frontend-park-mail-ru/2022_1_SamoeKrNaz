'use strict';

import * as render from './basePage.templ.js';
import BaseView from '../baseView.js';
import {Url} from '../../constants/constants.js';
import router from '../../modules/router.js';
import EventBus from '../../modules/eventBus.js';
import {ProfileActions, ProfileEvents} from '../../modules/actions.js';
import Dispatcher from '../../modules/dispatcher.js';

/**
 * Функция, осуществляющая выход пользователя из системы.
 */
// export function logout() {
// 	Ajax.delete({url: 'logout'})
// 		.then((r) => {
// 			loginPageRender();
// 		})
// 		.catch((er) => {
// 			console.error('error');
// 		});
// }

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
			{
				type: 'click',
				className: 'settingsButton',
				func: (e) => {
					const settingsBg = document.getElementsByClassName('settings__bg')[0]; // Фон попап окна
					const settings = document.getElementsByClassName('settings')[0]; // Само окно

					e.preventDefault(); // Предотвращаем дефолтное поведение браузера
					settingsBg.classList.add('active'); // Добавляем класс 'active' для фона
					settings.classList.add('active'); // И для самого окна;
				},
			},
			{
				type: 'click',
				className: 'settings__close',
				func: (e) => {
					const settingsBg = document.getElementsByClassName('settings__bg')[0]; // Фон попап окна
					const settings = document.getElementsByClassName('settings')[0]; // Само окно

					settingsBg.classList.remove('active'); // Убираем активный класс с фона
					settings.classList.remove('active'); // И с окна
				},
			},
			{
				type: 'click',
				className: 'deskButton',
				func: (e) => {
					router.open(Url.board);
				},
			},
			{
				type: 'click',
				className: 'homeButton',
				func: (e) => {
					router.open(Url.base);
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
	}
};
