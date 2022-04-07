'use strict';

import {loginPageRender} from '../loginPage/loginPage.js';
import {basePageRender} from '../basePage/basePage.js';
import {signupPageRender} from '../signupPage/signupPage.js';
import Ajax from '../modules/ajax.js';
import {frontendUrl, Url} from '../constants/constants.js';
import router from '../modules/router.js';
import {boardPageRender} from '../boardPage/boardPage.js';

/* Получение текущего адреса без домена */
const getUrl = window.location.pathname;

router.register(Url.index, loginPageRender);
router.register(Url.base, basePageRender);
router.register(Url.login, loginPageRender);
router.register(Url.signup, signupPageRender);
router.register(Url.board, boardPageRender);

/* Обработка текущего урла и переход по страницам в зависимости от куки */
router.open(getUrl);
