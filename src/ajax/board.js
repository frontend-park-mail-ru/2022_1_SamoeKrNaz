'use strict';

import Ajax from '../ajax/ajax.js';

export const ajaxMethods = {
	loadBoard: async (data) => {
		try {
			return await Ajax.get({url: 'board/' + data});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
};
