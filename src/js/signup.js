function signup(){
    deleteError();
    const inpLogin = document.getElementById('input_login').value;
    const inpPass = document.getElementById('input_pass').value;
    const inpPassRep = document.getElementById('input_pass_rep').value;
    if (inpLogin === true_login) {
        addError('Пользователь с таким именем уже зарегистрирован')
        return false;
    }
    if (inpLogin.length < 6){
        addError('Длина логина должна превышать 6 символов')
        return false;
    }
    if (inpPass.length < 6){
        addError('Длина пароля должна превышать 6 символов')
        return false;
    }
    if (inpPass !== inpPassRep){
        addError('Введенные пароли не совпадают');
        return false;
    }
    return true
};

const form = document.getElementById('input_form');
form.onsubmit = signup

const input_pas = document.getElementById('input_pass');
input_pas.onfocus = addPrompt




