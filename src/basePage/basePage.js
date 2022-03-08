'use strict';

import * as render from './basePage.templ.js';

export function basePageRender(r) {
    Handlebars.registerPartial('leftMenu', Handlebars.templates['leftMenu']);
    Handlebars.registerPartial('cap', Handlebars.templates['cap']);
    Handlebars.registerPartial('desk', Handlebars.templates['desk']);
    Handlebars.registerPartial('activeTask', Handlebars.templates['activeTask']);
    Handlebars.registerPartial('containerDesk', Handlebars.templates['containerDesk']);
    Handlebars.registerPartial('rightMenu', Handlebars.templates['rightMenu']);

    const tasks = {
        tasks: r,
        activeTasks: [{activeTaskText: 'Важное дело номер раз', activeTaskDate: '11 декабря 2022 года'},
            {activeTaskText: 'Важное дело номер два', activeTaskDate: '11 декабря 2022 года'},
            {activeTaskText: 'Важное дело номер три', activeTaskDate: '11 декабря 2022 года'},
            {activeTaskText: 'Важное дело номер четыре', activeTaskDate: '11 декабря 2022 года'}],
    };

    const basePage = Handlebars.templates.basePage;
    const html = basePage(tasks);

    window.history.pushState("", "", 'http://89.208.199.114:3000/base');
    document.body.innerHTML = html;

    document.getElementsByClassName('toggle__block')[0].onclick = toggleMenu;
    document.getElementsByClassName('toggle__block_blue')[0].onclick = toggleActiveTasks;

    document.getElementById('logout').addEventListener('click', logout());

    function toggleMenu() {
        document.getElementsByClassName("header")[0].classList.toggle("header_open");
        document.getElementsByClassName("main")[0].classList.toggle("menu-open");
        document.getElementById("search-icon").classList.toggle("toggle__icon_open");
    }

    function toggleActiveTasks() {
        document.getElementsByClassName("main")[0].classList.toggle("active-tasks-open");
        document.getElementsByClassName("active-tasks")[0].classList.toggle("close");
        document.getElementsByClassName("main__cap")[0].classList.toggle("active-close");
        document.getElementById("active-closer").classList.toggle("toggle__icon_open");
    }

    function logout() {
        const aj = new Ajax();
        aj.delete({url: '/logout'})
            .then(r => {
                loginPageRender();
            })
            .catch(er => {
            });
    };
};


