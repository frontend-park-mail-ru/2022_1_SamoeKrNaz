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
	loginProfile: async (data) => {
		try {
			return await Ajax.post({url: 'api/login', opt: data});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	registerProfile: async (data) => {
		try {
			return await Ajax.post({url: 'api/register', opt: data});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
};
