// добавление левого блока с рисунком
const decoration = Handlebars.templates.decoration;

let html = decoration({});
const root = document.getElementsByClassName('container')[0];
root.insertAdjacentHTML('beforeend', html)

// добавление правого блока для авторизации
const auth__form = document.createElement('div');
auth__form.className = 'auth__form';
root.appendChild(auth__form);
const auth__block = document.createElement('div');
auth__block.className = 'auth__block';
document.getElementsByClassName('auth__form')[0].appendChild(auth__block);

// добавление блока для лого
const auth_block_logo = document.createElement('div');
auth_block_logo.className = 'auth__block_logo';
document.getElementsByClassName('auth__block')[0].appendChild(auth_block_logo);

const logo = Handlebars.templates.logo;
html = logo({});
document.getElementsByClassName('auth__block_logo')[0].innerHTML += html;

// заглавная надпись
const headTitle = Handlebars.templates.headTitle;
html = headTitle({Text: 'Добро пожаловать на '});
document.getElementsByClassName('auth__block')[0].innerHTML += html;

// подпись
const descp = Handlebars.templates.descp;
html = descp({Text: 'Авторизация необходима для работы в команде.\n' +
        'Зарегистрируйся и начинай работать эффективней!'});
document.getElementsByClassName('auth__block')[0].innerHTML += html;

// создание формы
const auth_form = document.createElement('form');
auth_form.className = 'auth__block_form'; auth_form.id = 'input_form'; auth_form.action = 'base.html'; auth_form.method = 'POST';
document.getElementsByClassName('auth__block')[0].appendChild(auth_form);

// создание инпутов
const input_log = Handlebars.templates.input;
html = input_log({Placeholder: 'Укажите логин', Type:'text', Id:'input_login'});
document.getElementsByClassName('auth__block_form')[0].innerHTML += html;

const input_pass = Handlebars.templates.input;
html = input_pass({Placeholder: 'Введите пароль', Type:'password', Id:'input_pass'});
document.getElementsByClassName('auth__block_form')[0].innerHTML += html;

const input_pass_rep = Handlebars.templates.input;
html = input_pass_rep({Placeholder: 'Введите пароль', Type:'password', Id:'input_pass_rep'});
document.getElementsByClassName('auth__block_form')[0].innerHTML += html;
// кнопка
const button = Handlebars.templates.button;
html = button({Text: 'Зарегистрироваться!'});
document.getElementsByClassName('auth__block_form')[0].innerHTML += html;

// блок для регистрации
const signup = document.createElement('div');
signup.className = 'auth__block_signup';
document.getElementsByClassName('auth__block')[0].appendChild(signup);

//переход на регистрацию
const signup_descp = document.createElement('div');
signup_descp.className = 'auth__block_dont';
document.getElementsByClassName('auth__block_signup')[0].appendChild(signup_descp);

document.getElementsByClassName('auth__block_dont')[0].innerHTML += 'Уже зарегистрированы?'

const link = document.createElement('a');
link.href = 'signup.html';
link.className = 'auth__block_link';
document.getElementsByClassName('auth__block_signup')[0].appendChild(link);
document.getElementsByClassName('auth__block_link')[0].innerHTML += 'Войти';


