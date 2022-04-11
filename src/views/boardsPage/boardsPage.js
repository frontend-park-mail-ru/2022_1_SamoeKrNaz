'use strict';


import * as render from './boardsPage.templ.js';
import BaseView from '../baseView.js';
import BasePage from '../basePage/basePage.js';
import EventBus from '../../modules/eventBus.js';
import {BoardsActions, Events} from '../../modules/actions.js';
import Dispatcher from '../../modules/dispatcher.js';

/**
 * Класс, реализующий страницу списка досок
 */
export default new class BoardsPage extends BaseView {
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
		]);

		EventBus.subscribe(Events.boardsUpdate, this.onUpdate.bind(this));
	}

	/**
	 * Метод отвечающий за генерацию View
	 * @param {object} data данные, на основе которых будет формироваться страница
	 */
	render(data = null) {
		BasePage.render();

		this.onUpdate();

		Dispatcher.dispatch({
			type: BoardsActions.loadBoards,
		});
	}

	/**
	 * Метод, вызывающийся при обновлении стора досок
	 * @param {object} data состояние стора
	 */
	onUpdate(data = {boards: undefined}) {
		this.removeListeners();

		Handlebars.registerPartial('cap', Handlebars.templates['cap']);
		Handlebars.registerPartial('containerDesk', Handlebars.templates['containerDesk']);

		const root = document.getElementById('root');

		const boardsPage = Handlebars.templates.boardsPage;

		root.innerHTML = boardsPage({
			pageStatus: {
				isRightMenu: true,
				isLeftMenu: false,
			},
			boards: data.boards,
		});

		this._createListeners();
	}
};
