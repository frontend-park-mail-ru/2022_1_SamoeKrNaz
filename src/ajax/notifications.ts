import Ajax from '../ajax/ajax';

export const ajaxMethods = {
	loadNotifications: async () => {
		try {
			return await Ajax.get({url: 'notification'});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
};
