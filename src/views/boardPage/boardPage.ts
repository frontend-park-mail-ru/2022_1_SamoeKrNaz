import boardPageTemp from './boardPage.hbs';
import boardModal from '../../components/boardModal/boardModal.hbs';
import error from '../../components/error/error.hbs';

import BaseView from '../baseView';
import TaskView from '../taskView/taskView';
import BasePage from '../basePage/basePage';
import EventBus from '../../modules/eventBus';
import {BoardActions, Events, TaskActions} from '../../modules/actions';
import Dispatcher from '../../modules/dispatcher';
import Board from '../../stores/board';
import Profile from '../../stores/profile';
import {DispatcherAction, Event} from '../../modules/types';
import {copyLength} from '../../constants/constants';
import {DndEvent, DndEventForTask} from '../../modules/dndEvent';

type ModalSettings = {
	type: string,
	id?: string,
	title: string,
	isDelete?: boolean,
	isInvite?: boolean,
	isSave?: boolean,
	link?: string,
	onChange?: Array<Event>,
	inputs?: Array<{
		len?: boolean,
		isTypeInput: boolean,
		name: string,
		value?: string,
		title?: string,
		isInvite?: boolean,
	}>,
};

/**
 * Класс, реализующий страницу списка досок
 */
export default new (class BoardPage extends BaseView {
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
				className: 'desk-newList', // Класс, на который навешивается обработчки
				isArray: true,
				func: () => { // Функция, которая вызывается обработчиком
					this.openModal({
						type: BoardActions.createList,
						title: 'Создать колонку',
						isSave: true,
						inputs: [
							{
								isTypeInput: true,
								name: 'title',
								title: 'Название колонки',
								value: undefined,
							},
						],
					});
				},
			},
			{
				type: 'click', // Тип обработчика, который навешивается
				className: 'desk-settings', // Класс, на который навешивается обработчки
				isArray: true,
				func: () => { // Функция, которая вызывается обработчиком
					this.openModal({
						type: BoardActions.updateBoard,
						title: 'Настройки доски',
						isSave: true,
						inputs: [
							{
								isTypeInput: true,
								name: 'title',
								value: Board.getTitle(),
								title: 'Название:',
							},
							{
								isTypeInput: false,
								name: 'description',
								title: 'Описание:',
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
						isSave: true,
						title: 'Добавить карточку',
						inputs: [
							{
								len: true,
								isTypeInput: true,
								name: 'title',
								title: 'Название карточки:',
							},
						],
					});
				},
			},
			{
				type: 'click', // Тип обработчика, который навешивается
				className: 'desk-delete', // Класс, на который навешивается обработчки
				isArray: true,
				func: () => { // Функция, которая вызывается обработчиком
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
						title: 'Удалить колонку?',
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
					Dispatcher.dispatch({
						type: BoardActions.blockUpdate,
					});
					TaskView.render(e);
				},
			},
			{
				isArray: false,
				type: 'click', // Тип обработчика, который навешивается
				className: 'desk-invite', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					this.openModal({
						type: BoardActions.addUser,
						id: '',
						isInvite: true,
						title: 'Пригласить пользователя',
						inputs: [
							{
								isTypeInput: true,
								isInvite: false,
								name: 'title',
								title: 'Имя пользователя:',
							},
							{
								isTypeInput: true,
								isInvite: true,
								name: 'link',
								title: 'Ссылка для приглашения:',
								value: Board.getLink(),
							},
						],
						onChange: [{
							type: 'change', // Тип обработчика, который навешивается
							className: 'createModal__settings_input', // Класс, на который навешивается обработчки
							func: (e) => {
								Dispatcher.dispatch({
									type: BoardActions.findUsers,
									data: e.target.value,
								});
							},
						}],
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
						title: 'Удалить карточку?',
						inputs: [],
					});
				},
			},
			{
				isArray: true,
				type: 'click', // Тип обработчика, который навешивается
				className: 'taskBlock__img-block-delete', // Класс, на который навешивается обработчки
				func: (e) => { // Функция, которая вызывается обработчиком
					this.openModal({
						isDelete: true,
						type: BoardActions.deleteUsers,
						id: e.target.dataset.id,
						title: 'Удалить пользователя?',
						inputs: [],
					});
				},
			},
		]);

		EventBus.subscribe(Events.boardUpdate, this.onUpdate.bind(this));
		EventBus.subscribe(Events.boardError, this._boardError);
	}

	/**
	 * Метод отвечающий за генерацию View
	 */
	render():void {
		BasePage.render();

		const currentUrl = window.location.href;
		if (currentUrl.includes('boardappend/')) {
			Dispatcher.dispatch({
				type: BoardActions.loadBoardInvite,
			});
		} else if (currentUrl.includes('taskappend/')) {
			Dispatcher.dispatch({
				type: BoardActions.loadTaskInvite,
			});
		} else if (currentUrl.includes('task/')) {
			Dispatcher.dispatch({
				type: BoardActions.openTaskByUrl,
			});
		} else {
			Dispatcher.dispatch({
				type: BoardActions.loadBoard,
			});
		}

		this._createListeners();
	}

	/**
	 * Метод, вызывающийся при обновлении стора досок
	 * @param {object} data состояние стора
	 */
	onUpdate(data = {board: null}) {
		const addUsers = [];

		this.removeListeners();

		data.board?.Lists.map((el) => el.countTasks = el.Tasks.length + 1);
		data.board?.Users.map((el) => {
			if (el.username != Profile.getState().username) {
				addUsers.push(el);
			}
		});

		const html = boardPageTemp({
			pageStatus: BasePage.pageStatus,
			board: data.board,
			addUsers: addUsers,
		});

		const root = document.getElementById('root');

		/* Добавление контента в DOM */
		root.innerHTML = html;

		const dndEvents = new DndEvent('desk__column', 'desk__column-title');
		const dndEventForTask = new DndEventForTask('[data-isDnd="true"]');
		this._createListeners();
	}

	/**
	 * Метод позволяющий открывать модальные окна, по массиву
	 * @param {ModalSettings} data
	 */
	openModal(data: ModalSettings): void {
		document.getElementById('modalBlock').innerHTML = boardModal(data);

		document.getElementsByClassName('createModal__settings_cancel')[0].addEventListener('click', this.modalClose);
		document.getElementsByClassName('createModal__close')[0].addEventListener('click', this.modalClose);
		const icon = document.getElementsByClassName('createModal__settings_link_icon');
		if (icon.length > 0) {
			icon[0].addEventListener('click', this.copyLink);
		}
		document.getElementById('boardModal').addEventListener('submit', this.modalParse);

		const createDeskBg = document.getElementsByClassName('createModal__bg')[0]; // Фон попап окна
		const createDesk = document.getElementsByClassName('createModal')[0]; // Само окно

		data.onChange?.map((el) => this._addListener(el));

		createDeskBg.classList.add('active'); // Добавляем класс 'active' для фона
		createDesk.classList.add('active'); // И для самого окна;

		Dispatcher.dispatch({
			type: BoardActions.blockUpdate,
		});
	}

	/**
	 * Функция закрытия модального окна
	 */
	modalClose(): void {
		document.getElementsByClassName('createModal__settings_cancel')[0].removeEventListener('click', this.modalClose);
		document.getElementsByClassName('createModal__close')[0].removeEventListener('click', this.modalClose);
		document.getElementById('boardModal').removeEventListener('submit', this.modalParse);
		const icon = document.getElementsByClassName('createModal__settings_link_icon');
		if (icon.length > 0) {
			icon[0].removeEventListener('click', this.copyLink);
		}
		const createDeskBg = document.getElementsByClassName('createModal__bg')[0]; // Фон попап окна
		const createDesk = document.getElementsByClassName('createModal')[0]; // Само окно

		createDeskBg.classList.remove('active'); // Убираем активный класс с фона
		createDesk.classList.remove('active'); // И с окна

		Dispatcher.dispatch({
			type: BoardActions.unBlockUpdate,
		});
	}

	/**
	 * Функция закрытия модального окна
	 * @param {object} data
	 */
	_boardError(data): void {
		const el = document.getElementsByClassName('auth__block_error')[0];
		if (el) {
			el.remove();
		}

		const authDescp = document.getElementsByClassName('createModal__separator')[0];
		const html = error({errorText: data.validation.errorMsg});
		authDescp.outerHTML += html;
	}

	/**
	 * Парсит форму отправки модального окна
	 * @param {object} e
	 */
	modalParse(e): void {
		e.preventDefault();

		const payload = {
			title: null,
			description: null,
		};

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
			type: BoardActions.unBlockUpdate,
		});

		Dispatcher.dispatch({
			type: e.composedPath()[0].dataset.type,
			body: payload,
			id: (e.composedPath()[0].dataset.id) ? e.composedPath()[0].dataset.id : null,
		});
	}

	/**
	 * Копирование ссылки для присоединения
	 */
	copyLink() {
		const copyText = document.getElementsByClassName('createModal__settings_input_link')[0] as HTMLInputElement;

		copyText.select();
		copyText.setSelectionRange(0, copyLength);

		navigator.clipboard.writeText(copyText.value);
	}
});
