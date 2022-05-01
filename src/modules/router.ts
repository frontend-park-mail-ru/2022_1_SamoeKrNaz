import {Url} from '../constants/constants';
import EventBus from './eventBus';
import {ProfileEvents} from './actions';

/**
 * Класс, реализующий смену страниц и историю перемещений по странице
 */
class Router {
	/**
	 * @constructor
	 */
	constructor() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'routes' does not exist on type 'Router'.
		this.routes = {}; // маршруты, куда будем складывать путь-View
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'body' does not exist on type 'Router'.
		this.body = document.body; // берем тело index.html
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_currentView' does not exist on type 'Ro... Remove this comment to see the full error message
		this._currentView = null; // класс текущего вью

		EventBus.subscribe(ProfileEvents.load, this.start.bind(this));
	}

	/**
	 * Регистрация пути path и View к этому пути
	 * @param {string} path для регистрации
	 * @param {*} view View, которую регистрируем
	 * @return {Router} ссылка на объект роутера
	 */
	register(path, view) {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'routes' does not exist on type 'Router'.
		this.routes[path] = view;
		return this;
	}

	/**
	 * Старт роутера, регистрируем на все ссылки переключение с помощью роутера
	 * @param {object} data состояние стора пользователя
	 */
	start(data) {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'body' does not exist on type 'Router'.
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
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_currentView' does not exist on type 'Ro... Remove this comment to see the full error message
		if (this._currentView) {
			// @ts-expect-error ts-migrate(2339) FIXME: Property '_currentView' does not exist on type 'Ro... Remove this comment to see the full error message
			this._currentView.removeListeners();
		}

		// @ts-expect-error ts-migrate(2339) FIXME: Property 'body' does not exist on type 'Router'.
		this.body.removeEventListener('click', (event) => {
			event.path.map((el) => {
				if (el instanceof HTMLAnchorElement) {
					event.preventDefault();
					this.open(el.pathname);
				}
			});
		});

		// @ts-expect-error ts-migrate(2339) FIXME: Property 'routes' does not exist on type 'Router'.
		const view = this.routes[path.replace(/\/board\/\d+/g, '/board/<id>')];
		// @ts-expect-error ts-migrate(2339) FIXME: Property '_currentView' does not exist on type 'Ro... Remove this comment to see the full error message
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
