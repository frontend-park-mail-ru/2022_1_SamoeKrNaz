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
			const {target} = event;

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
		this.body.removeEventListener('click', (event) => {
			const {target} = event;
			if (target instanceof HTMLAnchorElement) {
				event.preventDefault();
				this.open(target.pathname);
			}
		});

		const view = this.routes[path];

		// зарегистрировал ли такой путь
		if (!view) {
			this.open(Url.index);
			return;
		}

		// проверяем урл, если другой, то добавляем в историю
		if (window.location.pathname !== path) {
			window.history.pushState('', '', path);
		}
		// рендерим страницу
		view(context);
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
