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
			{
				type: 'click', // Тип обработчика, который навешивается
				className: 'desl__newList', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					this._openModal({
						title: 'Создать список',
					});
				},
			},
		]);

		EventBus.subscribe(Events.boardUpdate, this.onUpdate.bind(this));
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
	onUpdate(data = {board: null}) {
		this.removeListeners();

		/* Регистрация всех компонентов для страницы */
		Handlebars.registerPartial('cap', Handlebars.templates['cap']);
		Handlebars.registerPartial('list', Handlebars.templates['list']);
		Handlebars.registerPartial('listDelete', Handlebars.templates['listDelete']);
		Handlebars.registerPartial('card', Handlebars.templates['card']);
		Handlebars.registerPartial('boardModal', Handlebars.templates['boardModal']);

		/* Рендер шаблона с входными данными */
		const boardPage = Handlebars.templates.boardPage;
		const html = boardPage({
			pageStatus: BasePage.pageStatus,
			board: data.board,
		});

		const root = document.getElementById('root');

		/* Добавление контента в DOM */
		root.innerHTML = html;

		this._createListeners();
	}

	/**
	 * Метод позволяющий открывать модальные окна, по массиву
	 * @param {object} data
	 */
	_openModal(data) {
		const modal = Handlebars.templates.boardModal;
		const html = modal(data);
		document.getElementById('root').innerHTML += html;

		const createDeskBg = document.getElementsByClassName('createModal__bg')[0]; // Фон попап окна
		const createDesk = document.getElementsByClassName('createModal')[0]; // Само окно

		createDeskBg.classList.add('active'); // Добавляем класс 'active' для фона
		createDesk.classList.add('active'); // И для самого окна;
	}
};

