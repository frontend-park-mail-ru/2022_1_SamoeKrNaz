'use strict';

import {loginPageRender} from '../loginPage/loginPage.js';
import {basePageRender} from '../basePage/basePage.js';
import {signupPageRender} from '../signupPage/signupPage.js';
import {Ajax} from "../modules/ajax.js";
import {addError} from "../modules/errors.js";
import {Messages} from "../constants/constants.js";

const domainSize = 27;

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
const getUrl = window.location.href.slice(domainSize);
if (getUrl === 'login'){
    const aj = new Ajax;
    aj.get({url: ''})
        .then(r => {
            if (r.status == 401){
                loginPageRender();
            }
            if (r.status === 200) {
                window.history.pushState("", "", 'http://89.208.199.114:3000/base');
                basePageRender(r.responseText);
            };
        })
        .catch(er => {
        });
} else if (getUrl === 'signup') {
    signupPageRender();
} else if (getUrl === 'base' || getUrl === '') {
    const aj = new Ajax;
    aj.get({url: ''})
        .then(r => {
            if (r.status === 401) {
                loginPageRender();
                window.history.pushState("", "", 'http://89.208.199.114:3000/login');
            }
            if (r.status === 200) {
                aj.get({url: ''}).then(r => {
                    console.log(r.status);
                    if (r.status === 200) {
                        console.log(r);
                        basePageRender(r.responseText);
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
        const section = target.href.slice(domainSize);
        if (section) {
            window.history.pushState("", "", section);
            configApp[section].openMethod();
        }
    }
});
