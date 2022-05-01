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
					BasePage.toggleLeft();
				},
			},
			{
				type: 'click',
				className: 'createDeskButtonUnic',
				func: (e) => {
					const createDeskBg = document.getElementsByClassName('createDesk__bg')[0]; // Фон попап окна
					const createDesk = document.getElementsByClassName('createDesk')[0]; // Само окно

					e.preventDefault(); // Предотвращаем дефолтное поведение браузера
					createDeskBg.classList.add('active'); // Добавляем класс 'active' для фона
					createDesk.classList.add('active'); // И для самого окна;
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
			pageStatus: BasePage.pageStatus,
			boards: data.boards,
		});

		this._createListeners();
	}
};
