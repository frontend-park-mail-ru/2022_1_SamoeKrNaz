'use strict';

import {validateLoginPage} from "../modules/validation.js";
import * as render from './loginPage.templ.js';

Handlebars.registerPartial('button', Handlebars.templates['button']);
Handlebars.registerPartial('decoration', Handlebars.templates['decoration']);
Handlebars.registerPartial('descp', Handlebars.templates['descp']);
Handlebars.registerPartial('error', Handlebars.templates['error']);
Handlebars.registerPartial('headTitle', Handlebars.templates['headTitle']);
Handlebars.registerPartial('input', Handlebars.templates['input']);
Handlebars.registerPartial('logo', Handlebars.templates['logo']);

const loginPage = Handlebars.templates.loginPage;
const html = loginPage({});

const container = document.getElementsByClassName('container')[0];
container.innerHTML += html;

const form = document.getElementById('input_form');

form.onsubmit = validateLoginPage;