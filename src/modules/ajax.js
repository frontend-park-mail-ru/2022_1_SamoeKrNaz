'use strict';
export class Ajax {
    _backUrl = 'http://89.208.199.114:8080/api';
    _frontUrl = 'http://89.208.199.114:3000';

    get(params = {}) {
        return this._ajax('GET', params);
    };

    post(params = {}) {
        return this._ajax('POST', params);
    };

    delete(params = {}) {
        return this._ajax('DELETE', params);
    };

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
