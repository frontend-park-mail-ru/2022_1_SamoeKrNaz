'use strict';

import {validateLoginPage, validateSignUpPage} from '../../modules/validation.js';
import * as render from './basePage.templ.js';
import {deleteListeners} from '../../modules/deleteEventListeners.js';
import BaseView from '../baseView.js';
import {Url} from '../../constants/constants.js';
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
export default new class LoginPage extends BaseView {
	/**
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 * Метод отвечающий за генерацию View
	 * @param {object} data данные, на основе которых будет формироваться страница
	 */
	render(data= null) {
		/* Удаляем обработчики событий для всех используемых элементов */
		deleteListeners();
		/* Регистрация всех компонентов для страницы */
		Handlebars.registerPartial('leftMenu', Handlebars.templates['leftMenu']);
		Handlebars.registerPartial('cap', Handlebars.templates['cap']);
		Handlebars.registerPartial('desk', Handlebars.templates['desk']);
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

	/**
	 * Метод, навешивающий обработчки на страницу
	 */
	_createListeners() {
		/* Навешивание обработчиков событий на кнопки */
		document.getElementsByClassName('toggle__block')[0].addEventListener('click', toggleMenu);
		document.getElementsByClassName('toggle__block_blue')[0].addEventListener('click', toggleActiveTasks);
		document.getElementById('logout').addEventListener('click', logout);

		const settingsBg = document.getElementsByClassName('settings__bg')[0]; // Фон попап окна
		const settings = document.getElementsByClassName('settings')[0]; // Само окно
		const openSettingsButton = document.getElementsByClassName('settingsButton')[0]; // Кнопки для показа окна
		const closeButton = document.getElementsByClassName('settings__close')[0];
		openSettingsButton.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
			e.preventDefault(); // Предотвращаем дефолтное поведение браузера
			settingsBg.classList.add('active'); // Добавляем класс 'active' для фона
			settings.classList.add('active'); // И для самого окна
		});

		closeButton.addEventListener('click', () => { // Вешаем обработчик на крестик
			settingsBg.classList.remove('active'); // Убираем активный класс с фона
			settings.classList.remove('active'); // И с окна
		});

		const deskButton = document.getElementsByClassName('deskButton')[0];
		deskButton.addEventListener('click', (e) => {
			router.open(Url.board);
		});

		const homeButton = document.getElementsByClassName('homeButton')[0];
		homeButton.addEventListener('click', (e) => {
			router.open(Url.base);
		});
	}
};


/**
 * Функция, осуществляющая рендер страницы пользователя с досками.
 * @param {json} r данных с бэка
 */
export function basePageRender(r) {
	/* Удаляем обработчики событий для всех используемых элементов */
	deleteListeners();
	/* Регистрация всех компонентов для страницы */
	Handlebars.registerPartial('leftMenu', Handlebars.templates['leftMenu']);
	Handlebars.registerPartial('cap', Handlebars.templates['cap']);
	Handlebars.registerPartial('desk', Handlebars.templates['desk']);
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

	/* Навешивание обработчиков событий на кнопки */
	document.getElementsByClassName('toggle__block')[0].addEventListener('click', toggleMenu);
	document.getElementsByClassName('toggle__block_blue')[0].addEventListener('click', toggleActiveTasks);
	document.getElementById('logout').addEventListener('click', logout);

	const settingsBg = document.getElementsByClassName('settings__bg')[0]; // Фон попап окна
	const settings = document.getElementsByClassName('settings')[0]; // Само окно
	const openSettingsButton = document.getElementsByClassName('settingsButton')[0]; // Кнопки для показа окна
	const closeButton = document.getElementsByClassName('settings__close')[0];
	openSettingsButton.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
		e.preventDefault(); // Предотвращаем дефолтное поведение браузера
		settingsBg.classList.add('active'); // Добавляем класс 'active' для фона
		settings.classList.add('active'); // И для самого окна
	});

	closeButton.addEventListener('click', () => { // Вешаем обработчик на крестик
		settingsBg.classList.remove('active'); // Убираем активный класс с фона
		settings.classList.remove('active'); // И с окна
	});

	const deskButton = document.getElementsByClassName('deskButton')[0];
	deskButton.addEventListener('click', (e) => {
		router.open(Url.board);
	});

	const homeButton = document.getElementsByClassName('homeButton')[0];
	homeButton.addEventListener('click', (e) => {
		router.open(Url.base);
	});
}

/**
 * Функция, осуществляющая выезд/въезд левого меню.
 */
export function toggleMenu() {
	document.getElementsByClassName('header')[0].classList.toggle('header_open');
	document.getElementsByClassName('main')[0].classList.toggle('menu-open');
	document.getElementById('search-icon').classList.toggle('toggle__icon_open');
}

/**
 * Функция, осуществляющая выезд/въезд правого меню.
 */
export function toggleActiveTasks() {
	document.getElementsByClassName('main')[0].classList.toggle('active-tasks-open');
	document.getElementsByClassName('active-tasks')[0].classList.toggle('close');
	document.getElementsByClassName('main__cap')[0].classList.toggle('active-close');
	document.getElementById('active-closer').classList.toggle('toggle__icon_open');
}
