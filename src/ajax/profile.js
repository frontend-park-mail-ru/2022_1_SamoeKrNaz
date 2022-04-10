'use strict';

import Ajax from '../ajax/ajax.js';

export const ajaxMethods = {
	loadProfile: async () => {
		try {
			return await Ajax.get({url: 'api'});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
};
