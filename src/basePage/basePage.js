'use strict';

import * as render from './basePage.templ.js';

export function basePageRender() {
    Handlebars.registerPartial('leftMenu', Handlebars.templates['leftMenu']);
    Handlebars.registerPartial('cap', Handlebars.templates['cap']);
    Handlebars.registerPartial('desk', Handlebars.templates['desk']);
    Handlebars.registerPartial('activeTask', Handlebars.templates['activeTask']);
    Handlebars.registerPartial('containerDesk', Handlebars.templates['containerDesk']);
    Handlebars.registerPartial('rightMenu', Handlebars.templates['rightMenu']);

    const tasks = {
        tasks: [{deskTitle: 'Доска для важных дел', deskDescp: 'Тут будет подробное описания таблицы и то зачем она. Но тут текст будет длиннее, чтобы можно было посмотреть, как увеличится блок.', deskDate: '11 Декабря 2022 года'},
            {deskTitle: 'Доска для важных дел', deskDescp: 'Тут будет подробное описания таблицы и то зачем она. Но тут текст будет длиннее, чтобы можно было посмотреть, как увеличится блок.', deskDate: '11 Декабря 2022 года'},
            {deskTitle: 'Доска для важных дел', deskDescp: 'Тут будет подробное описания таблицы и то зачем она. Но тут текст будет длиннее, чтобы можно было посмотреть, как увеличится блок.', deskDate: '11 Декабря 2022 года'},
            {deskTitle: 'Доска для важных дел', deskDescp: 'Чтобы можно было посмотреть, как увеличится блок.', deskDate: '11 Декабря 2022 года'},
            {deskTitle: 'Доска для важных дел', deskDescp: 'Чтобы можно было посмотреть, как увеличится блок.', deskDate: '11 Декабря 2022 года'}],
        activeTasks: [{activeTaskText: 'Важное дело номер раз', activeTaskDate: '11 декабря 2022 года'},
            {activeTaskText: 'Важное дело номер два', activeTaskDate: '11 декабря 2022 года'},
            {activeTaskText: 'Важное дело номер три', activeTaskDate: '11 декабря 2022 года'},
            {activeTaskText: 'Важное дело номер четыре', activeTaskDate: '11 декабря 2022 года'}],
    };

    const basePage = Handlebars.templates.basePage;
    const html = basePage(tasks);

    document.body.innerHTML = html;

    document.getElementsByClassName('toggle__block')[0].onclick = toggleMenu;
    document.getElementsByClassName('toggle__block_blue')[0].onclick = toggleActiveTasks;

    function toggleMenu() {
        document.getElementsByClassName("header")[0].classList.toggle("header_open");
        document.getElementsByTagName("body")[0].classList.toggle("menu-open");
        document.getElementById("search-icon").classList.toggle("toggle__icon_open");
    };

    function toggleActiveTasks() {
        document.getElementsByTagName("body")[0].classList.toggle("active-tasks-open");
        document.getElementsByClassName("active-tasks")[0].classList.toggle("close");
        document.getElementsByClassName("main__cap")[0].classList.toggle("active-close");
        document.getElementById("active-closer").classList.toggle("toggle__icon_open");
    };
};

