import {validateSignUpPage} from './validation.js';
import {addPrompt, deletePrompt} from './prompt.js';
import {toggleActiveTasks, toggleMenu, logout} from '../basePage/basePage.js';

/**
 * Функция, осуществляющая удаление обработчиков событий для всех используемых элементов.
 */
export function deleteListeners() {
	const toggleBlock = document.getElementsByClassName('toggle__block')[0];
	if (toggleBlock) {
		toggleBlock.removeEventListener('click', toggleMenu);
	}
	const toggleBlockBlue = document.getElementsByClassName('toggle__block_blue')[0];
	if (toggleBlockBlue) {
		toggleBlockBlue.removeEventListener('click', toggleActiveTasks);
	}
	const logoutButton = document.getElementById('logout');
	if (logoutButton) {
		logoutButton.getElementById('logout1').removeEventListener('click', logout);
	}
	const form = document.getElementById('input_form');
	if (form) {
		form.removeEventListener('submit', function(e) {
			e.preventDefault();
			validateSignUpPage();
		});
	}
	const inputPas = document.getElementById('input_pass');
	if (inputPas) {
		inputPas.removeEventListener('focus', addPrompt);
		inputPas.removeEventListener('blur', deletePrompt);
	};
}
