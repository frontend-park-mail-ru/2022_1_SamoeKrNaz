'use strict';

export class Ajax {
    _backUrl = 'https://api.hypixel.net/player';

    get(params = {}) {
        return this._ajax('GET', params);
    };

    post(params = {}) {
        return this._ajax('POST', params);
    };

    _ajax(method, params = {}) {
        let status;

        return fetch(this._backUrl + params.url, { method: method, ...params.opt})
            .then((response) => {
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