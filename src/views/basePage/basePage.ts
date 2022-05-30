import basePageTemp from './basePage.hbs';
import activeTasks from '../../components/rightMenu/rightMenu.hbs';
import error from '../../components/error/error';

import BaseView from '../baseView';
import {Url, Sizes} from '../../constants/constants';
import router from '../../modules/router';
import EventBus from '../../modules/eventBus';
import {BoardsActions, Events, ProfileActions, ProfileEvents} from '../../modules/actions';
import Dispatcher from '../../modules/dispatcher';
import SettingsView from '../settingsView/settingsView';
import type {ProfileStore} from '../../modules/types';

/**
 * Класс, реализующий страницу логина.
 */
export default new (class basePage extends BaseView {
	pageStatus: {
		isRightMenu: boolean,
		isLeftMenu: boolean,
	};

	/**
	 * @constructor
	 */
	constructor() {
		super([
			{
				type: 'click',
				className: 'newDeskButton',
				func: (e) => {
					const sBg = document.getElementsByClassName('createDesk__bg')[0]; // Фон попап окна
					const createDeskBg = document.getElementsByClassName('createDesk')[0]; // Само окно

					e.preventDefault(); // Предотвращаем дефолтное поведение браузера
					sBg.classList.add('active'); // Добавляем класс 'active' для фона
					createDeskBg.classList.add('active'); // И для самого окна;
				},
			},
			{
				type: 'click',
				className: 'toggle__block_blue',
				func: () => {
					this.toggleRight();
				},
			},
			{
				type: 'click',
				className: 'mobileHeader__leftOpen',
				func: () => {
					this.toggleLeft();
				},
			},
			{
				type: 'click',
				className: 'header__background',
				func: () => {
					this.toggleLeft();
				},
			},
			{
				type: 'click',
				className: 'header__mobileIcon',
				func: () => {
					this.toggleLeft();
				},
			},
			{
				type: 'click',
				className: 'header__menu-part',
				isArray: true,
				func: () => {
					if (document.documentElement.clientWidth < Sizes.lg) {
						this.toggleLeft();
					}
				},
			},
			{
				type: 'click',
				className: 'settingsButton',
				func: (e) => {
					const settingsBg = document.getElementsByClassName('settings__bg')[0]; // Фон попап окна
					const settings = document.getElementsByClassName('settings')[0]; // Само окно

					e.preventDefault(); // Предотвращаем дефолтное поведение браузера
					settingsBg.classList.add('active'); // Добавляем класс 'active' для фона
					settings.classList.add('active'); // И для самого окна;
				},
			},
			{
				type: 'click',
				className: 'settings__close',
				func: () => {
					const settingsBg = document.getElementsByClassName('settings__bg')[0]; // Фон попап окна
					const settings = document.getElementsByClassName('settings')[0]; // Само окно

					settingsBg.classList.remove('active'); // Убираем активный класс с фона
					settings.classList.remove('active'); // И с окна
				},
			},
			{
				type: 'click',
				className: 'homeButton',
				func: () => {
					router.open(Url.base);
				},
			},
			{
				type: 'click',
				className: 'createDesk__close',
				func: () => {
					this.modalClose();
				},
			},
			{
				type: 'click',
				className: 'createDesk__settings_cancel',
				func: () => {
					this.modalClose();
				},
			},
			{
				type: 'click',
				className: 'createDesk__settings_save',
				func: () => {
					Dispatcher.dispatch({
						type: BoardsActions.createBoard,
						title: (<HTMLInputElement>document.getElementsByClassName('createDesk__settings_input')[0]).value,
						description: (<HTMLInputElement>document.getElementsByClassName('createDesk__settings_textarea')[0]).value,
					});
				},
			},
			{
				type: 'click',
				id: 'logout',
				func: () => {
					Dispatcher.dispatch({
						type: ProfileActions.logout,
					});
				},
			},
		]);

		EventBus.subscribe(Events.boardsCreateError, this.errorRender);
		EventBus.subscribe(Events.boardsUpdate, this.modalClose);
		EventBus.subscribe(ProfileEvents.loadImpTask, this.loadImpTask);

		this.pageStatus = {
			isRightMenu: true,
			isLeftMenu: false,
		};
	}

	/**
	 * Метод отвечающий за генерацию View
	 */
	render() {
		if (document.getElementById('root')) {
			return;
		}

		const html = basePageTemp({
			pageStatus: this.pageStatus,
		});

		/* Добавление контента в DOM */
		document.body.innerHTML = html;

		this._createListeners();
		SettingsView.render();
	}

	/**
	 * Функция закрытия модального окна
	 */
	modalClose() {
		const createDeskBg = document.getElementsByClassName('createDesk__bg')[0]; // Фон попап окна
		const createDesk = document.getElementsByClassName('createDesk')[0]; // Само окно

		createDeskBg.classList.remove('active'); // Убираем активный класс с фона
		createDesk.classList.remove('active'); // И с окна
	}

	/**
	 * Функция закрытия модального окна
	 */
	loadImpTask(data: ProfileStore) {
		const div = document.querySelector('.active-tasks');
		console.log(data)
		data.impTasks.map((el) => {
			if (el.deadline !== '') {
				el.deadline = el.deadline.replace('-', '.').replace('-', '.').replace('T', ' ');
			} else {
				el.deadline = 'Без срока выполнения';
			}
		});

		const html = activeTasks({
			tasks: data.impTasks,
		});

		div.innerHTML = html;
	}

	/**
	 * Функция открытия/закрытия правого меню
	 */
	toggleRight() {
		this.pageStatus.isRightMenu = !this.pageStatus.isRightMenu;

		document.getElementsByClassName('main')[0].classList.toggle('active-tasks-open');
		document.getElementsByClassName('active-tasks')[0].classList.toggle('close');
		document.getElementsByClassName('main__cap')[0].classList.toggle('active-close');
		document.getElementById('active-closer').classList.toggle('toggle__icon_open');
	}

	/**
	 * Функция открытия/закрытия левого меню
	 */
	toggleLeft() {
		this.pageStatus.isLeftMenu = !this.pageStatus.isLeftMenu;

		document.getElementsByClassName('header')[0].classList.toggle('header_open');
		document.getElementsByClassName('main')[0].classList.toggle('menu-open');
		document.getElementById('search-icon').classList.toggle('toggle__icon_open');
		const bg = document.getElementsByClassName('header__background')[0];

		if (this.pageStatus.isLeftMenu) {
			bg.classList.add('header__background_block');
			bg.classList.add('header__background_active');
		} else {
			bg.classList.remove('header__background_active');
			bg.classList.remove('header__background_block');
		}
	}

	/**
	 * Добавление ошибки в форму
	 * @param {object} data
	 */
	errorRender(data) {
		const err = document.getElementsByClassName('auth__block_error')[0];
		if (err) {
			err.remove();
		}

		const sep = document.getElementsByClassName('createDesk__separator')[0];

		const html = error({settings: true, errorText: data.validation.errorMsg});
		sep.outerHTML += html;
	}
});
