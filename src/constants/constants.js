
export const Messages = {
	shortLogin: 'Длина логина должна составлять от 7 до 20 символов',
	shortPassword: 'Длина пароля должна составлять от 7 до 20 символов',
	notLogin: 'Пожалуйста, проверьте правильность написания логина и пароля',
	alreadyRegister: 'Пользователь с таким именем уже зарегистрирован',
	repeatPassword: 'Введенные пароли не совпадают',
	shortLoginPassword: 'Логин и пароль должны составлять от 7 до 20 символов',
	updateSuccess: 'Изменения успешно сохранены',
	updateUnSuccess: 'Выбранный Вами формат файла не поддерживается',
	bigSize: 'Ваша картинка превышает размер 5 МБ',

	shortTitle: 'Длина названия должна быть от 3 до 30 символов',
};

export const Url = {
	login: '/login',
	base: '/base',
	signup: '/signup',
	board: '/board/<id>',
	index: '/',
	notFound: '/404',
	noNetwork: '/noNetwork',
};

export const ResponseStatus = {
	unAuth: 401,
	success: 200,
	badRequest: 400,
	conflict: 409,
	created: 201,
	forbidden: 403,
	noContent: 204,
};

export const backendUrl = window.location.origin.replace(':3000', ':8080') + '/';
export const frontendUrl = window.location.origin;
