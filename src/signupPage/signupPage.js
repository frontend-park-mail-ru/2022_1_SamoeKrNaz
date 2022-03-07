'use strict';

import * as render from './signupPage.templ.js';
import {validateSignUpPage} from "../modules/validation.js";
import {addPrompt} from "../modules/prompt.js";
import {basePageRender} from "../basePage/basePage.js";

function validateRedirect(evt) {
    evt.preventDefault();
    if (validateSignUpPage()) {
        window.history.pushState("", "", 'base');
        basePageRender();
        return true;
    };
    return false;
}

export function signupPageRender() {
    Handlebars.registerPartial('button', Handlebars.templates['button']);
    Handlebars.registerPartial('decoration', Handlebars.templates['decoration']);
    Handlebars.registerPartial('descp', Handlebars.templates['descp']);
    Handlebars.registerPartial('error', Handlebars.templates['error']);
    Handlebars.registerPartial('headTitle', Handlebars.templates['headTitle']);
    Handlebars.registerPartial('input', Handlebars.templates['input']);
    Handlebars.registerPartial('logo', Handlebars.templates['logo']);

    const signupPage = Handlebars.templates.signupPage;
    const html = signupPage({});

    document.body.innerHTML ='';
    const container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);
    document.getElementsByClassName('container')[0].innerHTML += html;

    const form = document.getElementById('input_form');
    form.addEventListener('submit', validateRedirect);

    const input_pas = document.getElementById('input_pass');
    input_pas.onfocus = addPrompt;
};