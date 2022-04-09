'use strict';

/**
 * Функция, осуществляющая добавление ошибки в DOM.
 * @param {string} errorText текст ошибки
 */
export function addError(errorText) {
	deleteError();
	const authDescp = document.getElementsByClassName('auth__block_descp')[0];
	const error = Handlebars.templates.error;
	const html = error({errorText: errorText});
	authDescp.outerHTML += html;
}

/**
 * Функция, осуществляющая удаление ошибки в DOM.
 */
function deleteError() {
	const el = document.getElementsByClassName('auth__block_error')[0];
	if (el) {
		el.remove();
	}
}
