import Ajax from '../ajax/ajax';

export const ajaxMethods = {
	loadNotifications: async () => {
		try {
			return await Ajax.get({url: 'notification'});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	readAll: async () => {
		try {
			return await Ajax.post({url: 'notification'});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	clear: async () => {
		try {
			return await Ajax.delete({url: 'notification'});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
};
