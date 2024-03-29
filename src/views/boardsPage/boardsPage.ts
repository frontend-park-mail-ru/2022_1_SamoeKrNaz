import boardsPageTemp from './boardsPage.hbs';
import BaseView from '../baseView';
import BasePage from '../basePage/basePage';
import EventBus from '../../modules/eventBus';
import {BoardsActions, Events} from '../../modules/actions';
import Dispatcher from '../../modules/dispatcher';

/**
 * Класс, реализующий страницу списка досок
 */
export default new (class BoardsPage extends BaseView {
	/**
	 * @constructor
	 */
	constructor() {
		super([
			{
				type: 'click', // Тип обработчика, который навешивается
				className: 'toggle__block', // Класс, на который навешивается обработчки
				func: () => { // Функция, которая вызывается обработчиком
					BasePage.toggleLeft();
				},
			},
			{
				type: 'click',
				className: 'createDeskButtonUnic',
				isArray: true,
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
	 */
	render() {
		BasePage.render();

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

		const root = document.getElementById('root');

		root.innerHTML = boardsPageTemp({
			pageStatus: BasePage.pageStatus,
			boards: data.boards,
		});

		this._createListeners();
	}
});
