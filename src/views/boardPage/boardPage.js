'use strict';

import * as render from './boardPage.templ.js';
import Ajax from '../../ajax/ajax.js';
import router from '../../modules/router.js';
import {Url} from '../../constants/constants.js';

/**
 * Функция, осуществляющая рендер страницы пользователя с досками.
 * @param {json} r данных с бэка
 */
export function boardPageRender(r) {
	/* Регистрация всех компонентов для страницы */
	Handlebars.registerPartial('leftMenu', Handlebars.templates['leftMenu']);
	Handlebars.registerPartial('cap', Handlebars.templates['cap']);
	Handlebars.registerPartial('list', Handlebars.templates['list']);
	Handlebars.registerPartial('activeTask', Handlebars.templates['activeTask']);
	Handlebars.registerPartial('containerDesk', Handlebars.templates['containerDesk']);
	Handlebars.registerPartial('rightMenu', Handlebars.templates['rightMenu']);
	Handlebars.registerPartial('listDelete', Handlebars.templates['listDelete']);
	Handlebars.registerPartial('settings', Handlebars.templates['settings']);
	Handlebars.registerPartial('card', Handlebars.templates['card']);

	/* Рендер шаблона с входными данными */
	const boardPage = Handlebars.templates.boardPage;
	const html = boardPage(r);

	/* Добавление контента в DOM */
	document.body.innerHTML = html;


	const deleteListBg = document.getElementsByClassName('delete__bg')[0]; // Фон попап окна
	const deleteList = document.getElementsByClassName('delete')[0]; // Само окно
	const deleteListButton = document.getElementsByClassName('deleteButton')[0]; // Кнопки для показа окна
	// const closeButton = document.getElementsByClassName("settings__close")[0];
	deleteListButton.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
		e.preventDefault(); // Предотвращаем дефолтное поведение браузера
		deleteListBg.classList.add('active'); // Добавляем класс 'active' для фона
		deleteList.classList.add('active'); // И для самого окна
	});

	const cardBg = document.getElementsByClassName('card__bg')[0]; // Фон попап окна
	const card = document.getElementsByClassName('card')[0]; // Само окно
	const cardButton = document.getElementsByClassName('cardButton')[0]; // Кнопки для показа окна
	// const closeButton = document.getElementsByClassName("settings__close")[0];
	cardButton.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
		e.preventDefault(); // Предотвращаем дефолтное поведение браузера
		cardBg.classList.add('active'); // Добавляем класс 'active' для фона
		card.classList.add('active'); // И для самого окна
	});

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


	document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
		if (e.target === deleteListBg) { // Если цель клика - фот, то:
			deleteListBg.classList.remove('active'); // Убираем активный класс с фона
			deleteList.classList.remove('active'); // И с окна
		}
	});

	document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
		if (e.target === cardBg) { // Если цель клика - фот, то:
			cardBg.classList.remove('active'); // Убираем активный класс с фона
			card.classList.remove('active'); // И с окна
		}
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
