'use strict';

import Ajax from '../ajax/ajax';

export const ajaxMethods = {
	loadTask: async (data) => {
		try {
			return await Ajax.get({url: 'task/' + data.id});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	updateTitle: async (data) => {
		try {
			return await Ajax.put({url: 'task/' + data.id, opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	addUser: async (data) => {
		try {
			return await Ajax.post({url: 'task/' + data.id + '/' + data.body.idu});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	removeUser: async (data) => {
		try {
			return await Ajax.delete({url: 'task/' + data.id + '/' + data.body.idu});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	changeDate: async (data) => {
		try {
			return await Ajax.put({url: 'task/' + data.id, opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	changeDescription: async (data) => {
		try {
			return await Ajax.put({url: 'task/' + data.id, opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	addChecklist: async (data) => {
		try {
			return await Ajax.post({url: 'task/' + data.id + '/checklist', opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	addItem: async (data) => {
		try {
			return await Ajax.post({url: 'checklist/' + data.id + '/checklistitem', opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	removeChecklist: async (data) => {
		try {
			return await Ajax.delete({url: 'checklist/' + data.id});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	removeItem: async (data) => {
		try {
			return await Ajax.delete({url: 'checklistitem/' + data.id});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	checkItem: async (data) => {
		try {
			return await Ajax.put({url: 'checklistitem/' + data.id, opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	changeCheckList: async (data) => {
		try {
			return await Ajax.put({url: 'checklistitem/' + data.id, opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	changeCheckListTitle: async (data) => {
		try {
			return await Ajax.put({url: 'checklist/' + data.id, opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	addComment: async (data) => {
		try {
			return await Ajax.post({url: 'task/' + data.id + '/comment', opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	changeComment: async (data) => {
		try {
			return await Ajax.put({url: 'comment/' + data.id, opt: JSON.stringify(data.body)});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	deleteComment: async (data) => {
		try {
			return await Ajax.delete({url: 'comment/' + data.id});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
	loadInvite: async (data) => {
		try {
			return await Ajax.get({url: 'task/append/' + data});
		} catch (err) {
			console.error('Error connection: ' + err);
		}
	},
};
