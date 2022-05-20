'use strict';

import Ajax from '../ajax/ajax';

export const ajaxMethods = {
	loadBoard: async (data) => {
		try {
			return await Ajax.get({url: 'board/' + data});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	createList: async (data) => {
		try {
			return await Ajax.post({url: 'board/' + data.id + '/list', opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	updateBoard: async (data) => {
		try {
			return await Ajax.put({url: 'board/' + data.id, opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	addTask: async (data) => {
		try {
			return await Ajax.post({url: 'board/' + data.idb + '/list/' + data.idl + '/task', opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	deleteDesk: async (data) => {
		try {
			return await Ajax.delete({url: 'board/' + data.id});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	deleteList: async (data) => {
		try {
			return await Ajax.delete({url: 'list/' + data.id});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	updateList: async (data) => {
		try {
			return await Ajax.put({url: 'list/' + data.id, opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	updateTask: async (data) => {
		try {
			return await Ajax.put({url: 'task/' + data.id, opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	deleteTask: async (data) => {
		try {
			return await Ajax.delete({url: 'task/' + data.id});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	findUsers: async (data) => {
		try {
			return await Ajax.post({url: 'api/profile/like', opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	moveList: async (data) => {
		try {
			return await Ajax.put({url: 'list/' + data.id, opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	addUser: async (data) => {
		try {
			return await Ajax.post({url: 'board/' + data.id + '/' + data.body});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
};
