import {frontendUrl, backendUrl} from '../constants/constants.js';

/**
 * Класс, реализующий методы доступа к апи
 */
class Ajax {
	frontendUrl = frontendUrl;
	backendUrl = backendUrl;
	/**
	 * Метод, реализующий любые GET запросы к апи. Требуется задавать только URL
	 * @param {object} params - параметры запроса
	 * @return {promise} - результат запроса
	 */
	get(params = {}) {
		return this._ajax('GET', params);
	}

	/**
	 * Метод, реализующий любые POST запросы к апи. Требуется задавать URL и OPT данные, которые передаются
	 * @param {object} params - параметры запроса
	 * @return {promise} - результат запроса
	 */
	post(params = {}) {
		return this._ajax('POST', params);
	}

	/**
	 * Метод, реализующий любые DELETE запросы к апи. Требуется задавать только URL
	 * @param {object} params - параметры запроса
	 * @return {promise} - результат запроса
	 */
	delete(params = {}) {
		return this._ajax('DELETE', params);
	}

	/**
	 * Метод, реализующий любые запросы к апи. Требуется задавать метод и тело
	 * @param {string} method - Метод запроса строкой
	 * @param {object} params - параметры запроса
	 * @return {promise} - результат запроса
	 */
	_ajax(method, params = {}) {
		let status;

		return fetch(this.backendUrl + params.url, {
			method: method,
			mode: 'cors',
			credentials: 'include',
			headers: {
				Origin: this.frontendUrl,
			},
			body: params.opt,
		})
			.then((response) => {
				status = response.status;
				return response.json();
			})
			.then((parsedBody) => {
				return {
					status,
					responseText: parsedBody,
				};
			});
	}
}

export default new Ajax();
