'use strict';

import {loginPageRender} from '../loginPage/loginPage.js';
import {basePageRender} from '../basePage/basePage.js';
import {signupPageRender} from '../signupPage/signupPage.js';

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
    basePageRender();
}

document.body.addEventListener('click', (e) => {
    const {target} = e;
    if (target instanceof HTMLAnchorElement) {
        e.preventDefault();
        const section = target.href.slice(22);
        if (section) {
            window.history.pushState("", "", target.href);
            configApp[section].openMethod();
        }
    }
});