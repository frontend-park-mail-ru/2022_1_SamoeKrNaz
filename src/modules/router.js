import {Url} from '../constants/constants.js';
import EventBus from './eventBus.js';
import {ProfileEvents} from './actions.js';

/**
 * Класс, реализующий смену страниц и историю перемещений по странице
 */
class Router {
	/**
	 * @constructor
	 */
	constructor() {
		this.routes = {}; // маршруты, куда будем складывать путь-View
		this.body = document.body; // берем тело index.html
		this._currentView = undefined; // класс текущего вью

		EventBus.subscribe(ProfileEvents.load, this.start.bind(this));
	}

	/**
	 * Регистрация пути path и View к этому пути
	 * @param {string} path для регистрации
	 * @param {*} view View, которую регистрируем
	 * @return {Router} ссылка на объект роутера
	 */
	register(path, view) {
		this.routes[path] = view;
		return this;
	}

	/**
	 * Старт роутера, регистрируем на все ссылки переключение с помощью роутера
	 * @param {object} data состояние стора пользователя
	 */
	start(data) {
		this.body.addEventListener('click', (event) => {
			event.path.map((el) => {
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
	 * @param {*} context Данные с бэка для рендера страницы
	 */
	open(path, context = null) {
		if (this._currentView) {
			this._currentView.removeListeners();
		}

		this.body.removeEventListener('click', (event) => {
			event.path.map((el) => {
				if (el instanceof HTMLAnchorElement) {
					event.preventDefault();
					this.open(el.pathname);
				}
			});
		});

		const view = this.routes[path.replace(/\/board\/\d+/g, '/board/<id>')];
		this._currentView = view;

		// зарегистрировал ли такой путь
		if (!view) {
			this.open(Url.notFound);
			return;
		}

		// проверяем урл, если другой, то добавляем в историю
		if (window.location.pathname !== path) {
			console.log(path)
			window.history.pushState('', '', '..' + path);
		}
		// рендерим страницу
		view.render(context);
	}

	/**
	 * Переключение страницы назад
	 */
	back() {
		window.history.back();
	}

	/**
	 * Переключение страницы вперед
	 */
	forward() {
		window.history.forward();
	}
}

export default new Router();
