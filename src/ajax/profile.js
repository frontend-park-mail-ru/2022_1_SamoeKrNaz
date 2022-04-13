'use strict';

import Ajax from '../ajax/ajax.js';

export const ajaxMethods = {
	loadProfile: async () => {
		try {
			return await Ajax.get({url: 'api/profile'});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	loginProfile: async (data) => {
		try {
			return await Ajax.post({url: 'api/login', opt: JSON.stringify(data)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	registerProfile: async (data) => {
		try {
			return await Ajax.post({url: 'api/register', opt: JSON.stringify(data)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	updateProfile: async (data) => {
		try {
			return await Ajax.put({url: 'api/profile', opt: JSON.stringify(data)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	uploadAvatar: async (data) => {
		try {
			return await Ajax.put({url: 'api/profile/upload', opt: data});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	logout: async () => {
		try {
			return await Ajax.delete({url: 'api/logout'});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
};
