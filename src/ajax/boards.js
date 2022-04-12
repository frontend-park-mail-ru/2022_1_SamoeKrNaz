'use strict';

import Ajax from '../ajax/ajax.js';

export const ajaxMethods = {
	loadBoards: async () => {
		try {
			return await Ajax.get({url: 'api/load/anime'});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	createBoard: async (data) => {
		try {
			return await Ajax.post({url: 'board', opt: JSON.stringify(data)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
};
