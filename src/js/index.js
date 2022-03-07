'use strict';

import {loginPageRender} from '../loginPage/loginPage.js';
import {basePageRender} from '../basePage/basePage.js';
import {signupPageRender} from '../signupPage/signupPage.js';
import {Ajax} from "../modules/ajax.js";
import {addError} from "../modules/errors.js";
import {Messages} from "../constants/constants.js";

const configApp = {
    signup: {
        href: '/sighup',
        openMethod: signupPageRender,
    },
    login: {
        href: '/login',
        openMethod: loginPageRender,
    },
    base: {
        href: '/base',
        openMethod: basePageRender,
    }
};
const getUrl = window.location.href.slice(22);
if (getUrl === 'login' || getUrl === ''){
    loginPageRender();
} else if (getUrl === 'signup') {
    signupPageRender();
} else if (getUrl === 'base') {
    const aj = new Ajax;
    aj.post({url: '/login', opt: JSON.stringify({Username: inpLogin, Password: inpPass})})
        .then(r => {
            if (r.status === 401) {
                loginPageRender();
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
}

document.body.addEventListener('click', (e) => {
    const {target} = e;
    if (target instanceof HTMLAnchorElement) {
        e.preventDefault();
        const section = target.href.slice(22);
        if (section) {
            configApp[section].openMethod();
        }
    }
});