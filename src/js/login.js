function login(){
    const inpLogin = document.getElementById('input_login').value
    const inpPass = document.getElementById('input_password').value
    if (inpLogin.length < 6) {
        addError('Слишком короткий логин')
        return false;
    }
    if (inpPass.length < 6) {
        addError('Слишком короткий пароль')
        return false;
    }
    if (inpPass !== true_pass || inpLogin !== true_login){
        addError('Пожалуйста, проверьте правильность написания логина и пароля')
        return false;
    }
    return true;
};

const form = document.getElementById('input_form');
form.onsubmit = login



