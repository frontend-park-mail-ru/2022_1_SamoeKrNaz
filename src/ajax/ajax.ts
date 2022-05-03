import {backendUrl, frontendUrl} from '../constants/constants';
import router from '../modules/router';
import {Url} from '../constants/constants';

type RequestParams = {
	url: string,
	opt?,
};

/**
 * Класс, реализующий методы доступа к апи
 */
class Ajax {
	frontendUrl = frontendUrl;
	backendUrl = backendUrl;
	/**
	 * Метод, реализующий любые GET запросы к апи. Требуется задавать только URL
	 * @param {RequestParams} params - параметры запроса
	 * @return {promise} - результат запроса
	 */
	async get(params: RequestParams) {
		return await this._ajax('GET', params);
	}

	/**
	 * Метод, реализующий любые POST запросы к апи. Требуется задавать URL и OPT данные, которые передаются
	 * @param {RequestParams} params - параметры запроса
	 * @return {promise} - результат запроса
	 */
	async post(params: RequestParams) {
		return await this._ajax('POST', params);
	}

	/**
	 * Метод, реализующий любые DELETE запросы к апи. Требуется задавать только URL
	 * @param {RequestParams} params - параметры запроса
	 * @return {promise} - результат запроса
	 */
	async put(params: RequestParams) {
		return await this._ajax('PUT', params);
	}

	/**
	 * Метод, реализующий любые DELETE запросы к апи. Требуется задавать только URL
	 * @param {RequestParams} params - параметры запроса
	 * @return {promise} - результат запроса
	 */
	async delete(params: RequestParams) {
		return await this._ajax('DELETE', params);
	}

	/**
	 * Метод, реализующий любые запросы к апи. Требуется задавать метод и тело
	 * @param {string} method - Метод запроса строкой
	 * @param {object} params - параметры запроса
	 * @return {promise} - результат запроса
	 */
	async _ajax(method: string, params: RequestParams) {
		try {
			const response = await fetch(this.backendUrl + params.url, {
				method: method,
				mode: 'cors',
				credentials: 'include',
				headers: {
					Origin: this.frontendUrl,
				},
				body: params.opt,
			});

			const status = response.status;
			const body = await response.json();

			return {
				status,
				body,
			};
		} catch (e) {
			router.open(Url.noNetwork);
		}
	}
}

export default new Ajax();
