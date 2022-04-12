'use strict';

import Ajax from '../ajax/ajax.js';

export const ajaxMethods = {
	loadBoards: async () => {
		try {
			return await Ajax.get({url: 'board'});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
};
