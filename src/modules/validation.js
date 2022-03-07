'use strict';

import {addError} from './errors.js'
import {Messages} from "../constants/constants.js";
import {Ajax} from './ajax.js';
import {basePageRender} from "../basePage/basePage.js";

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
    };
    if (inpPass.length < 6) {
        addError(Messages['shortPassword']);
        return false;
    };
    // if (inpLogin !== 'planexa' || inpPass !== '123456') {
    //     addError(Messages['notLogin']);
    //     return false;
    // }
    const aj = new Ajax;
    aj.post({url: '/login', opt: JSON.stringify({Username: inpLogin, Password: inpPass})})
        .then(r => {
            if (r.status === 401) {
                addError(Messages['notLogin']);
            }
            if (r.status === 200) {
                aj.get({url: ''}).then(r => {
                    console.log(r.status);
                    if (r.status === 200) {
                        console.log(r);
                        basePageRender(r);
                    }
                })
            };
        })
        .catch(er => {
        });
    return true;
};

export function validateSignUpPage() {
    const inpLogin = document.getElementById('input_login').value;
    const inpPass = document.getElementById('input_pass').value;
    const inpPassRep = document.getElementById('input_pass_rep').value;
    if (inpLogin === 'planexa') {
        addError(Messages['alreadyRegister']);
        return false;
    };
    if (inpLogin.length < 6){
        addError(Messages['shortLogin']);
        return false;
    };
    if (inpPass.length < 6){
        addError(Messages['shortPassword']);
        return false;
    };
    if (inpPass !== inpPassRep){
        addError(Messages['repeatPassword']);
        return false;
    };
    return true;
};