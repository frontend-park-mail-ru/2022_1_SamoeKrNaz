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

export type EventListener = Array<{
	type: string,
	className?: string,
	id?: string,
	func: (e?: any) => void,
	isArray?: boolean,
}>;
