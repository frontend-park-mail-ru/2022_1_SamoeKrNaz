'use strict';

import * as render from './signupPage.templ.js'
import {validateSignUpPage} from "../modules/validation.js";
import {addPrompt} from "../modules/prompt.js";


Handlebars.registerPartial('button', Handlebars.templates['button']);
Handlebars.registerPartial('decoration', Handlebars.templates['decoration']);
Handlebars.registerPartial('descp', Handlebars.templates['descp']);
Handlebars.registerPartial('error', Handlebars.templates['error']);
Handlebars.registerPartial('headTitle', Handlebars.templates['headTitle']);
Handlebars.registerPartial('input', Handlebars.templates['input']);
Handlebars.registerPartial('logo', Handlebars.templates['logo']);

const signupPage = Handlebars.templates.signupPage;
const html = signupPage({});

const container = document.getElementsByClassName('container')[0]
container.innerHTML += html;

const form = document.getElementById('input_form');
form.onsubmit = validateSignUpPage

const input_pas = document.getElementById('input_pass');
input_pas.onfocus = addPrompt