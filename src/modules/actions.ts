'use strict';

export const ProfileActions = {
	loadProfile: 'loadProfile',
	login: 'loginProfile',
	register: 'registerProfile',
	update: 'updateProfile',
	uploadAvatar: 'uploadAvatar',
	logout: 'logout',
	loadImpTask: 'loadImpTask',
};

export const ProfileEvents = {
	load: 'Profile_load',
	login: 'Profile_login',
	register: 'Profile_register',
	updateSuccess: 'Profile_update_success',
	updateUnSuccess: 'Profile_update_unsuccessful',
	updateAvatarSuccess: 'Profile_avatar_success',
	updateAvatarUnSuccess: 'Profile_avatar_unsuccessful',
	loadImpTask: 'loadImpTask',
};

export const BoardActions = {
	moveList: 'moveList',
	deleteUsers: 'deleteUsers',
	moveTask: 'moveTask',
	loadBoard: 'loadBoard',
	updateState: 'updateState',
	createList: 'createList',
	updateBoard: 'updateBoard',
	addTask: 'addTask',
	deleteDesk: 'deleteDesk',
	deleteList: 'deleteList',
	updateList: 'updateList',
	updateTask: 'updateTask',
	deleteTask: 'deleteTask',
	addUser: 'addUser',
	findUsers: 'findUsers',
	copyLink: 'copyLink',
	loadBoardInvite: 'loadBoardInvite',
	loadTaskInvite: 'loadTaskInvite',
	blockUpdate: 'blockUpdate',
	unBlockUpdate: 'unBlockUpdate',
};

export const TaskActions = {
	loadTask: 'loadTask',
	updateTask: 'updateTasks',
	updateTitle: 'updateTitle',
	addUser: 'adduser',
	removeUser: 'removeUser',
	changeDate: 'changeDate',
	changeDescription: 'changeDescription',
	addChecklist: 'addChecklist',
	addItem: 'addItem',
	removeChecklist: 'removeChecklist',
	removeItem: 'removeItem',
	checkItem: 'checkItem',
	changeCheckList: 'changeCheckList',
	changeCheckListTitle: 'changeCheckListTitle',
	addComment: 'addComment',
	changeComment: 'changeComment',
	deleteComment: 'deleteComment',
	loadInvite: 'loadInvite',
	copyLink: 'copyLink',
	uploadAttachment: 'uploadAttachment',
	removeAttachment: 'removeAttachment',
	downloadAttachment: 'downloadAttachment',
	blockUpdate: 'blockTaskUpdate',
	unBlockUpdate: 'unBlockTaskUpdate',
	setImportant: 'setImportant',
};

export const BoardsActions = {
	loadBoards: 'loadBoards',
	createBoard: 'createBoard',
};

export const NotificationActions = {
	loadNotifications: 'loadNotifications',
};

export const Events = {
	boardsUpdate: 'boards',
	boardsCreateError: 'boardsError',
	boardUpdate: 'board',
	boardError: 'boardError',
	taskUpdate: 'taskUpdate',
	taskDelete: 'taskDelete',
};

