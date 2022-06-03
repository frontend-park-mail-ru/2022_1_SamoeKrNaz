import EventBus from './eventBus';
import {Events} from './actions';

export default new class Loaders {
	/**
	 * @constructor
	 */
	constructor() {
		EventBus.subscribe(Events.startLoader, this.start.bind(this));
		EventBus.subscribe(Events.stopLoader, this.stop.bind(this));
	}

	/**
	 * Метод, отличающий за активацию лоадеров
	 */
	start() {
		const hidden = document.querySelectorAll('[data-hidden-loader="false"]');
		const loaders = document.querySelectorAll('[data-loader="false"]');
		console.log(132)
		for (const key in hidden) {
			if (hidden.hasOwnProperty(key)) {
				(<HTMLElement> hidden[key]).setAttribute('data-hidden-loader', 'true');
			}
		}

		for (const key in loaders) {
			if (loaders.hasOwnProperty(key)) {
				(<HTMLElement> loaders[key]).setAttribute('data-loader', 'true');
			}
		}
	}

	/**
	 * Метод, отличающий за деактивацию лоадеров
	 */
	stop() {
		const hidden = document.querySelectorAll('[data-hidden-loader="true"]');
		const loaders = document.querySelectorAll('[data-loader="true"]');

		for (const key in hidden) {
			if (hidden.hasOwnProperty(key)) {
				(<HTMLElement> hidden[key]).setAttribute('data-hidden-loader', 'false')
			}
		}

		for (const key in loaders) {
			if (loaders.hasOwnProperty(key)) {
				(<HTMLElement> loaders[key]).setAttribute('data-loader', 'false');
			}
		}
	}
}
