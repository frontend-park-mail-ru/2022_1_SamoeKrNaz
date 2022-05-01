import basePageTemp from './basePage.hbs';
import BaseView from '../baseView';
import {Url, Sizes} from '../../constants/constants';
import router from '../../modules/router';
import EventBus from '../../modules/eventBus';
import {BoardsActions, Events, ProfileActions, ProfileEvents} from '../../modules/actions';
import Dispatcher from '../../modules/dispatcher';
import SettingsView from '../settingsView/settingsView';

/**
 * Класс, реализующий страницу логина.
 */
export default new (class basePage extends BaseView {
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
				func: (e) => {
					this.toggleRight();
				},
			},
			{
				type: 'click',
				className: 'mobileHeader__leftOpen',
				func: (e) => {
					this.toggleLeft();
				},
			},
			{
				type: 'click',
				className: 'header__background',
				func: (e) => {
					this.toggleLeft();
				},
			},
			{
				type: 'click',
				className: 'header__mobileIcon',
				func: (e) => {
					this.toggleLeft();
				},
			},
			{
				type: 'click',
				className: 'header__menu-part',
				isArray: true,
				func: (e) => {
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
				func: (e) => {
					const settingsBg = document.getElementsByClassName('settings__bg')[0]; // Фон попап окна
					const settings = document.getElementsByClassName('settings')[0]; // Само окно

					settingsBg.classList.remove('active'); // Убираем активный класс с фона
					settings.classList.remove('active'); // И с окна
				},
			},
			{
				type: 'click',
				className: 'homeButton',
				func: (e) => {
					router.open(Url.base);
				},
			},
			{
				type: 'click',
				className: 'createDesk__close',
				func: (e) => {
					this.modalClose();
				},
			},
			{
				type: 'click',
				className: 'createDesk__settings_cancel',
				func: (e) => {
					this.modalClose();
				},
			},
			{
				type: 'click',
				className: 'createDesk__settings_save',
				func: (e) => {
					console.log(1)
					Dispatcher.dispatch({
						type: BoardsActions.createBoard,
						// @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Element'.
						title: document.getElementsByClassName('createDesk__settings_input')[0].value,
						// @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Element'.
						description: document.getElementsByClassName('createDesk__settings_textarea')[0].value,
					});
				},
			},
			{
				type: 'click',
				id: 'logout',
				func: (e) => {
					Dispatcher.dispatch({
						type: ProfileActions.logout,
					});
				},
			},
		]);

		EventBus.subscribe(Events.boardsCreateError, this.errorRender);
		EventBus.subscribe(Events.boardsUpdate, this.modalClose);

		// @ts-expect-error ts-migrate(2339) FIXME: Property 'pageStatus' does not exist on type 'base... Remove this comment to see the full error message
		this.pageStatus = {
			isRightMenu: true,
			isLeftMenu: false,
		};
	}

	/**
	 * Метод отвечающий за генерацию View
	 * @param {object} data данные, на основе которых будет формироваться страница
	 */
	render(data = null) {
		if (document.getElementById('root')) {
			return;
		}

		const html = basePageTemp({
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'pageStatus' does not exist on type 'base... Remove this comment to see the full error message
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
	 * Функция открытия/закрытия правого меню
	 */
	toggleRight() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'pageStatus' does not exist on type 'base... Remove this comment to see the full error message
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
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'pageStatus' does not exist on type 'base... Remove this comment to see the full error message
		this.pageStatus.isLeftMenu = !this.pageStatus.isLeftMenu;

		document.getElementsByClassName('header')[0].classList.toggle('header_open');
		document.getElementsByClassName('main')[0].classList.toggle('menu-open');
		document.getElementById('search-icon').classList.toggle('toggle__icon_open');
		const bg = document.getElementsByClassName('header__background')[0];
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'pageStatus' does not exist on type 'base... Remove this comment to see the full error message
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
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Handlebars'.
		const error = Handlebars.templates.error;
		const html = error({settings: true, errorText: data.validation.errorMsg});
		sep.outerHTML += html;
	}
});
