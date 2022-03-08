'use strict';

/**
 * Функция, осуществляющая добавление ошибки в DOM.
 * @param {string} errorText текст ошибки
 * @returns {boolean} возвращение false для прерывания действия
 */

export function addError(errorText) {
    deleteError();
    const authDescp = document.getElementsByClassName('auth__block_descp')[0];

    const error = Handlebars.templates.error;
    const html = error({errorText: errorText});
    authDescp.outerHTML += html;
    return false;
};

/**
 * Функция, осуществляющая удаление ошибки в DOM.
 */

function deleteError(){
    let el = document.getElementsByClassName('auth__block_error')[0];
    if (el) {
        el.remove();
    };
};
