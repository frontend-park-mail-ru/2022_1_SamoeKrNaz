'use strict';

import * as render from './basePage.templ.js';
import Ajax from '../modules/ajax.js';
import {loginPageRender} from '../loginPage/loginPage.js';
import {deleteListeners} from '../modules/deleteEventListeners.js';

/**
 * Функция, осуществляющая выход пользователя из системы.
 */
export function logout() {
	Ajax.delete({url: '/logout'})
		.then(r => {
			loginPageRender();
		})
		.catch((er) => {
			console.error('error');
		});
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

	/* Получение данных с бэка */
	const tasks = {
		tasks: r,
		activeTasks: [{activeTaskText: 'Важное дело номер раз', activeTaskDate: '11 декабря 2022 года'},
			{activeTaskText: 'Важное дело номер два', activeTaskDate: '11 декабря 2022 года'},
			{activeTaskText: 'Важное дело номер три', activeTaskDate: '11 декабря 2022 года'},
			{activeTaskText: 'Важное дело номер четыре', activeTaskDate: '11 декабря 2022 года'}],
	};

	/* Рендер шаблона с входными данными */
	const basePage = Handlebars.templates.basePage;
	const html = basePage(tasks);

	/* Смена урла в адресной строке */
	window.history.pushState('', '', 'http://89.208.199.114:3000/base');

	/* Добавление контента в DOM */
	document.body.innerHTML = html;

	/* Навешивание обработчиков событий на кнопки */
	document.getElementsByClassName('toggle__block')[0].addEventListener('click', toggleMenu);
	document.getElementsByClassName('toggle__block_blue')[0].addEventListener('click', toggleActiveTasks);
	document.getElementById('logout').onclick = logout;
};

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
};
