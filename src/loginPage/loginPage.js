'use strict';

import {validateLoginPage} from "../modules/validation.js";
import * as render from './loginPage.templ.js';
import {basePageRender} from "../basePage/basePage.js";

export function loginPageRender() {
    Handlebars.registerPartial('button', Handlebars.templates['button']);
    Handlebars.registerPartial('decoration', Handlebars.templates['decoration']);
    Handlebars.registerPartial('descp', Handlebars.templates['descp']);
    Handlebars.registerPartial('error', Handlebars.templates['error']);
    Handlebars.registerPartial('headTitle', Handlebars.templates['headTitle']);
    Handlebars.registerPartial('input', Handlebars.templates['input']);
    Handlebars.registerPartial('logo', Handlebars.templates['logo']);

    window.history.pushState("", "", 'http://89.208.199.114:3000/login');

    const loginPage = Handlebars.templates.loginPage;
    const html = loginPage({});

    document.body.innerHTML ='';

    const container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);
    document.getElementsByClassName('container')[0].innerHTML += html;

    const form = document.getElementById('input_form');
    form.onsubmit = validateLoginPage;
};