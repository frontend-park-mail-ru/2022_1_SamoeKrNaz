'use strict';

import {addError} from './errors.js'
import {Messages} from "../constants/constants.js";
import {Ajax} from './ajax.js';
import {basePageRender} from "../basePage/basePage.js";

/**
 * Функция, осуществляющая валидацию email.
 * @param {string} email входящий email
 * @returns {RegExpMatchArray} получившиеся совпадения
 */

export function validateEmail (email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

/**
 * Функция, осуществляющая валидацию входа пользователя.
 * @returns {boolean} статус валидации
 */

export function validateLoginPage(){
    const inpLogin = document.getElementById('input_login').value
    const inpPass = document.getElementById('input_pass').value
    if (inpLogin.length < 6) {
        addError(Messages['shortLogin']);
        return false;
    };
    if (inpPass.length < 6) {
        addError(Messages['shortPassword']);
        return false;
    };
    const aj = new Ajax;
    aj.post({url: '/login', opt: JSON.stringify({Username: inpLogin, Password: inpPass})})
        .then(r => {
            if (r.status === 401) {
                addError(Messages['notLogin']);
            }
            if (r.status === 200) {
                aj.get({url: ''}).then(r => {
                    console.log(r.status);
                    if (r.status === 200) {
                        console.log(r);
                        basePageRender(r.responseText);
                    }
                })
            };
        })
        .catch(er => {
        });
    return false;
};

/**
 * Функция, осуществляющая валидацию регистрации пользователя.
 * @returns {boolean} статус валидации
 */

export function validateSignUpPage() {
    const inpLogin = document.getElementById('input_login').value;
    const inpPass = document.getElementById('input_pass').value;
    const inpPassRep = document.getElementById('input_pass_rep').value;
    if (inpLogin.length <= 6){
        addError(Messages['shortLogin']);
        return false;
    };
    if (inpPass.length <= 6){
        addError(Messages['shortPassword']);
        return false;
    };
    if (inpPass !== inpPassRep){
        addError(Messages['repeatPassword']);
        return false;
    };
    const aj = new Ajax;
    aj.post({url: '/register', opt: JSON.stringify({Username: inpLogin, Password: inpPass})})
        .then(r => {
            if (r.status === 409) {
                console.log(r.status);
                addError(Messages['alreadyRegister']);
            }
            if (r.status === 201) {
                aj.get({url: ''}).then(r => {
                    console.log(r.status);
                    if (r.status === 200) {
                        console.log(r);
                        basePageRender(r.responseText);
                    }
                })
            };
        })
        .catch(er => {
        });
    return false;
};
