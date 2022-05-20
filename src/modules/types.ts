export interface DispatcherAction {
	type: string,
	title?: string,
	description?: string,
	body?: any,
	id?: number,
	data?: any,
	login?: string,
	password?: string,
	passwordRepeat?: string,
	username?: string,
	img_avatar?: string,
}

export interface ProfileStore {
	isAuth: boolean,
	id: number,
	username: string,
	img: string,

	validation: {
		errorMsg: string,
		successMsg: string,
	},

	avatar: {
		successAv: string,
		unSuccessAv: string,
		avatarPath: string,
	},
}

export interface Event {
	type: string,
	className?: string,
	id?: string,
	func: (e?: any) => void,
	isArray?: boolean,
}

export type EventListener = Array<Event>;

export type Task = Array<{
	idt: number,
	title: string,
}>;

export type List = Array<{
	title: string,
	idl: number,
	Tasks: Task,
	position: number,
}>;

export type Users = Array<{
	idu: number,
	username: string,
	img_avatar: string,
}>;

export interface BoardStore {
	idb: number,
	title: string,
	description: string,
	Users: Users,
	Lists: List,
}

export interface TaskStore {
	title: string,
	description: string,
	append_users: Users,
	idt: number,
	checkList: Array<{
		title: string,
		id_cl: number,
		CheckListItems: Array<{
			id_clit: number,
			isready: boolean,
			title: string,
		}>,
	}>,
	comment: Array<{
		isYou: boolean,
		idu: number,
		idcm: number,
		title: string,
		user: {
			username: string,
		},
	}>,
}
