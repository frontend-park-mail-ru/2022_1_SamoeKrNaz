import {Url} from '../constants/constants.js';

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
	};

	/**
	 * Регистрация пути path и View к этому пути
	 * @param {string} path для регистрации
	 * @param {*} view View, которую регистрируем
	 * @return {Router} ссылка на объект роутера
	 */
	register(path, view) {
		this.routes[path] = view;
		return this;
	};

	/**
	 * Старт роутера, регистрируем на все ссылки переключение с помощью роутера
	 */
	start() {
		this.body.addEventListener('click', (event) => {
			const {target} = event;
			if (target instanceof HTMLAnchorElement) {
				event.preventDefault();
				this.open(target.pathname);
			}
		});
		// popstate при нажатии кнопок вперед/назад
		window.addEventListener('popstate', () =>{
			this.open(window.location.pathname);
		});
		const currentUrl = window.location.pathname;
		this.open(currentUrl);
	};
	/**
	 * Старт роутера, регистрируем на все ссылки переключение с помощью роутера
	 * @param {string} path Урл для рендера
	 * @param {*} context Данные с бэка для рендера страницы
	 */
	open(path, context = null) {
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
	};

	back() {
		window.history.back();
	};

	forward() {
		window.history.forward();
	};
};

export default new Router();
