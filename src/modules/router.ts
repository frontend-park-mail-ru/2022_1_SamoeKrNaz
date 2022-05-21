import {Url} from '../constants/constants';
import EventBus from './eventBus';
import {ProfileEvents} from './actions';
import {ProfileStore} from './types';
import BaseView from '../views/baseView';

/**
 * Класс, реализующий смену страниц и историю перемещений по странице
 */
class Router {
	_routes: Map<string, BaseView>;
	_body: HTMLElement;
	_currentView: BaseView;

	/**
	 * @constructor
	 */
	constructor() {
		this._routes = new Map(); // маршруты, куда будем складывать путь-View
		this._body = document.body; // берем тело index.html
		this._currentView = null; // класс текущего вью

		EventBus.subscribe(ProfileEvents.load, this.start.bind(this));
	}

	/**
	 * Регистрация пути path и View к этому пути
	 * @param {string} path для регистрации
	 * @param {BaseView} view View, которую регистрируем
	 */
	register(path: string, view: BaseView): void {
		this._routes.set(path, view);
	}

	/**
	 * Старт роутера, регистрируем на все ссылки переключение с помощью роутера
	 * @param {ProfileStore} data состояние стора пользователя
	 */
	start(data: ProfileStore): void {
		this._body.addEventListener('click', (event) => {
			event.composedPath().map((el) => {
				if (el instanceof HTMLAnchorElement) {
					event.preventDefault();
					this.open(el.pathname);
				}
			});
		});

		// popstate при нажатии кнопок вперед/назад
		window.addEventListener('popstate', () => {
			this.open(window.location.pathname);
		});

		if (data.isAuth) {
			if (window.location.pathname === Url.login || window.location.pathname === Url.signup) {
				this.open(Url.base);
			} else {
				this.open(window.location.pathname);
			}
		} else {
			if (window.location.pathname === Url.login || window.location.pathname === Url.signup) {
				this.open(window.location.pathname);
			} else {
				this.open(Url.login);
			}
		}
	}

	/**
	 * Старт роутера, регистрируем на все ссылки переключение с помощью роутера
	 * @param {string} path Урл для рендера
	 * @param {object} context Данные с бэка для рендера страницы
	 */
	open(path: string, context: object = null): void {
		if (this._currentView) {
			this._currentView.removeListeners();
		}

		this._body.removeEventListener('click', (event) => {
			// @ts-ignore
			event.path.map((el) => {
				if (el instanceof HTMLAnchorElement) {
					event.preventDefault();
					this.open(el.pathname);
				}
			});
		});

		let view = this._routes.get(path.replace(/\/board\/\d+/g, '/board/<id>'));
		if (view === undefined) {
			view = this._routes.get(path.replace(/\/boardappend\/.+/g, '/boardappend/<token>'));
			if (view === undefined) {
				view = this._routes.get(path.replace(/\/taskappend\/.+/g, '/taskappend/<token>'));
			}
		}
		this._currentView = view;

		// зарегистрировал ли такой путь
		if (!view) {
			this.open(Url.notFound);
			return;
		}

		// проверяем урл, если другой, то добавляем в историю
		if (window.location.pathname !== path) {
			window.history.pushState('', '', '..' + path);
		}
		// рендерим страницу
		view.render();
	}

	/**
	 * Переключение страницы назад
	 */
	back(): void {
		window.history.back();
	}

	/**
	 * Переключение страницы вперед
	 */
	forward(): void {
		window.history.forward();
	}
}

export default new Router();
