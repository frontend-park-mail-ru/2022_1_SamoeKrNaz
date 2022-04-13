'use strict';

export const ProfileActions = {
	loadProfile: 'loadProfile',
	login: 'loginProfile',
	register: 'registerProfile',
	update: 'updateProfile',
	uploadAvatar: 'uploadAvatar',
	logout: 'logout',
};

export const ProfileEvents = {
	load: 'Profile_load',
	login: 'Profile_login',
	register: 'Profile_register',
	updateSuccess: 'Profile_update_success',
	updateUnSuccess: 'Profile_update_unsuccessful',
	updateAvatarSuccess: 'Profile_avatar_success',
	updateAvatarUnSuccess: 'Profile_avatar_unsuccessful',
};

export const BoardActions = {
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
};

export const BoardsActions = {
	loadBoards: 'loadBoards',
	createBoard: 'createBoard',
};

export const Events = {
	boardsUpdate: 'boards',
	boardsCreateError: 'boardsError',
	boardUpdate: 'board',
};

