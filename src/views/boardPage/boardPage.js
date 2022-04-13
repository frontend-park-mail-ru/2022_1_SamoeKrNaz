'use strict';


import * as render from './boardPage.templ.js';
import BaseView from '../baseView.js';
import BasePage from '../basePage/basePage.js';
import EventBus from '../../modules/eventBus.js';
import {BoardActions, BoardsActions, Events} from '../../modules/actions.js';
import Dispatcher from '../../modules/dispatcher.js';
import Board from '../../stores/board.js';

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
					this.openModal({
						type: BoardActions.createList,
						title: 'Создать список',
						inputs: [
							{
								isTypeInput: true,
								name: 'title',
								placeholder: 'Название списка',
								value: undefined,
							},
						],
					});
				},
			},
			{
				type: 'click', // Тип обработчика, который навешивается
				className: 'desk__settings', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					this.openModal({
						type: BoardActions.updateBoard,
						title: 'Настройки доски',
						inputs: [
							{
								isTypeInput: true,
								name: 'title',
								placeholder: 'Название доски',
								value: Board.getTitle(),
							},
							{
								isTypeInput: false,
								name: 'description',
								placeholder: 'Описание доски',
								value: Board.getDescription(),
							},
						],
					});
				},
			},
			{
				isArray: true,
				type: 'click', // Тип обработчика, который навешивается
				className: 'desk__newButton', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					this.openModal({
						type: BoardActions.addTask,
						id: e.target.dataset.id,
						title: 'Добавить задачу',
						inputs: [
							{
								isTypeInput: true,
								name: 'title',
								placeholder: 'Название задачи',
							},
						],
					});
				},
			},
			{
				type: 'click', // Тип обработчика, который навешивается
				className: 'desk__delete', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					this.openModal({
						isDelete: true,
						type: BoardActions.deleteDesk,
						title: 'Удалить доску?',
					});
				},
			},
			{
				isArray: true,
				type: 'click', // Тип обработчика, который навешивается
				className: 'desk__listIcon', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					this.openModal({
						isDelete: true,
						type: BoardActions.deleteList,
						id: e.target.dataset.id,
						title: 'Удалить список?',
						inputs: [],
					});
				},
			},
			{
				isArray: true,
				type: 'blur', // Тип обработчика, который навешивается
				className: 'desk__title-input', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					Dispatcher.dispatch({
						type: BoardActions.updateList,
						id: e.target.dataset.id,
						body: {
							title: e.target.value,
						},
					});
				},
			},
			{
				isArray: true,
				type: 'keydown', // Тип обработчика, который навешивается
				className: 'desk__title-input', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					if (e.keyCode === 13) {
						e.target.blur();
					}
				},
			},
			{
				isArray: true,
				type: 'click', // Тип обработчика, который навешивается
				className: 'desk__task-text', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					this.openModal({
						type: BoardActions.updateTask,
						id: e.target.dataset.id,
						title: 'Редактирование задачи',
						inputs: [
							{
								isTypeInput: true,
								name: 'title',
								placeholder: 'Название задачи',
								value: e.target.innerText,
							},
						],
					});
				},
			},
			{
				isArray: true,
				type: 'click', // Тип обработчика, который навешивается
				className: 'desk__task-close', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					this.openModal({
						isDelete: true,
						type: BoardActions.deleteTask,
						id: e.target.dataset.id,
						title: 'Удалить задачу?',
						inputs: [],
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

		this._createListeners();
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
	openModal(data) {
		const modal = Handlebars.templates.boardModal;
		document.getElementById('modalBlock').innerHTML = modal(data);

		document.getElementsByClassName('createModal__settings_cancel')[0].addEventListener('click', this.modalClose);
		document.getElementsByClassName('createModal__close')[0].addEventListener('click', this.modalClose);
		document.getElementById('boardModal').addEventListener('submit', this.modalParse);

		const createDeskBg = document.getElementsByClassName('createModal__bg')[0]; // Фон попап окна
		const createDesk = document.getElementsByClassName('createModal')[0]; // Само окно

		createDeskBg.classList.add('active'); // Добавляем класс 'active' для фона
		createDesk.classList.add('active'); // И для самого окна;
	}

	/**
	 * Функция закрытия модального окна
	 */
	modalClose() {
		document.getElementsByClassName('createModal__settings_cancel')[0].removeEventListener('click', this.modalClose);
		document.getElementsByClassName('createModal__close')[0].removeEventListener('click', this.modalClose);
		document.getElementById('boardModal').removeEventListener('submit', this.modalParse);

		const createDeskBg = document.getElementsByClassName('createModal__bg')[0]; // Фон попап окна
		const createDesk = document.getElementsByClassName('createModal')[0]; // Само окно

		createDeskBg.classList.remove('active'); // Убираем активный класс с фона
		createDesk.classList.remove('active'); // И с окна
	}

	/**
	 * Парсит форму отправки модального окна
	 * @param {object} e
	 */
	modalParse(e) {
		e.preventDefault();

		const payload = {};

		for (const key in e.target) {
			if (e.target.hasOwnProperty(key)) {
				const el = e.target[key];

				if (el.type !== 'submit') {
					payload[el.dataset.name] = el.value;
				}
			}
		}

		if (payload.title?.length === 0) {
			return;
		}

		Dispatcher.dispatch({
			type: e.path[0].dataset.type,
			body: payload,
			id: (e.path[0].dataset.id) ? e.path[0].dataset.id : null,
		});
	}
};

