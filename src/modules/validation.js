'use strict';

import {addError} from './errors.js'
import {true_login, true_pass, Messages} from "../constants/constants.js";

export function validateEmail (email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export function validateLoginPage(){
    const inpLogin = document.getElementById('input_login').value
    const inpPass = document.getElementById('input_pass').value
    if (inpLogin.length < 6) {
        addError(Messages['shortLogin']);
        return false;
    }
    if (inpPass.length < 6) {
        addError(Messages['shortPassword']);
        return false;
    }
    if (inpPass !== true_pass || inpLogin !== true_login){
        addError(Messages['notLogin']);
        return false;
    }
    return true;
};

export function validateSignUpPage() {
    const inpLogin = document.getElementById('input_login').value;
    const inpPass = document.getElementById('input_pass').value;
    const inpPassRep = document.getElementById('input_pass_rep').value;
    if (inpLogin === true_login) {
        addError(Messages['alreadyRegister']);
        return false;
    }
    if (inpLogin.length < 6){
        addError(Messages['shortLogin']);
        return false;
    }
    if (inpPass.length < 6){
        addError(Messages['shortPassword']);
        return false;
    }
    if (inpPass !== inpPassRep){
        addError(Messages['repeatPassword']);
        return false;
    }
}

