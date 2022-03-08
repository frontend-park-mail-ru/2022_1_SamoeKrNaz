'use strict';
export class Ajax {
    _backUrl = 'http://89.208.199.114:8080/api';
    _frontUrl = 'http://89.208.199.114:3000';

    /**
     * Метод, реализующий любые GET запросы к апи. Требуется задавать только URL
     * @param {object} params - параметры запроса
     * @returns {promice} - результат запроса
     */
    get(params = {}) {
        return this._ajax('GET', params);
    };

    /**
     * Метод, реализующий любые POST запросы к апи. Требуется задавать URL и OPT данные, которые передаются
     * @param {object} params - параметры запроса
     * @returns {promice} - результат запроса
     */
    post(params = {}) {
        return this._ajax('POST', params);
    };

    /**
     * Метод, реализующий любые DELETE запросы к апи. Требуется задавать только URL
     * @param {object} params - параметры запроса
     * @returns {promice} - результат запроса
     */
    delete(params = {}) {
        return this._ajax('DELETE', params);
    };

    /**
     * Метод, реализующий любые запросы к апи. Требуется задавать метод и тело
     * @param {string} method - Метод запроса строкой
     * @returns {promice} - результат запроса
     */
    _ajax(method, params = {}) {
        let status;

        return fetch(this._backUrl + params.url, {
            method: method,
            mode: 'cors',
            credentials: 'include',
            headers: {
                Origin: this._frontUrl,
            },
            body: params.opt
        })
            .then((response) => {
                console.log(response);
                status = response.status;
                return response.json();
            })
            .then(parsedBody => {
                return {
                    status,
                    responseText: parsedBody
                };
            });
    };
};
