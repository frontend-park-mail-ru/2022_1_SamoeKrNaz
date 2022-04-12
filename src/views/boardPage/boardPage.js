'use strict';


import * as render from './boardPage.templ.js';
import BaseView from '../baseView.js';
import BasePage from '../basePage/basePage.js';
import EventBus from '../../modules/eventBus.js';
import {BoardActions, BoardsActions, Events} from '../../modules/actions.js';
import Dispatcher from '../../modules/dispatcher.js';

/**
 * Класс, реализующий страницу списка досок
 */
export default new class BoardPage extends BaseView {
	/**
	 * @constructor
	 */
	constructor() {
		super([
			{
				type: 'click', // Тип обработчика, который навешивается
				className: 'toggle__block', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					BasePage.pageStatus.isLeftMenu = !BasePage.pageStatus.isLeftMenu;

					document.getElementsByClassName('header')[0].classList.toggle('header_open');
					document.getElementsByClassName('main')[0].classList.toggle('menu-open');
					document.getElementById('search-icon').classList.toggle('toggle__icon_open');
				},
			},
			{
				type: 'click', // Тип обработчика, который навешивается
				className: 'deleteButton', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					e.preventDefault(); // Предотвращаем дефолтное поведение браузера
					document.getElementsByClassName('delete__bg')[0].classList.add('active'); // Добавляем класс 'active' для фона
					document.getElementsByClassName('delete')[0].classList.add('active'); // И для самого окна
				},
			},
			{
				type: 'click', // Тип обработчика, который навешивается
				className: 'cardButton', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					e.preventDefault(); // Предотвращаем дефолтное поведение браузера
					document.getElementsByClassName('card__bg')[0].classList.add('active'); // Добавляем класс 'active' для фона
					document.getElementsByClassName('card')[0].classList.add('active'); // И для самого окна
				},
			},
		]);

		EventBus.subscribe(Events.boardUpdate, this.onUpdate.bind());
	}

	/**
	 * Метод отвечающий за генерацию View
	 * @param {object} data данные, на основе которых будет формироваться страница
	 */
	render(data = null) {
		BasePage.render();

		this.onUpdate();

		Dispatcher.dispatch({
			type: BoardActions.loadBoard,
		});
	}

	/**
	 * Метод, вызывающийся при обновлении стора досок
	 * @param {object} data состояние стора
	 */
	onUpdate(data = {boards: undefined}) {
		this.removeListeners();

		/* Регистрация всех компонентов для страницы */
		Handlebars.registerPartial('cap', Handlebars.templates['cap']);
		Handlebars.registerPartial('list', Handlebars.templates['list']);
		Handlebars.registerPartial('listDelete', Handlebars.templates['listDelete']);
		Handlebars.registerPartial('card', Handlebars.templates['card']);

		/* Рендер шаблона с входными данными */
		const boardPage = Handlebars.templates.boardPage;
		const html = boardPage({
			pageStatus: BasePage.pageStatus,
		});

		const root = document.getElementById('root');

		/* Добавление контента в DOM */
		root.innerHTML = html;

		this._createListeners();
	}
};

