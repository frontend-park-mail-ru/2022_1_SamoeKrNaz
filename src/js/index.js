'use strict';

import {loginPageRender} from '../loginPage/loginPage.js';
import {basePageRender} from '../basePage/basePage.js';
import {signupPageRender} from '../signupPage/signupPage.js';
import {Url} from '../constants/constants.js';
import router from '../modules/router.js';
import {boardPageRender} from '../boardPage/boardPage.js';
import Dispatcher from '../modules/dispatcher.js';
import {ProfileActions} from '../modules/actions.js';

Dispatcher.dispatch({
	type: ProfileActions.loadProfile,
});

router.register(Url.index, loginPageRender);
router.register(Url.base, basePageRender);
router.register(Url.login, loginPageRender);
router.register(Url.signup, signupPageRender);
router.register(Url.board, boardPageRender);

router.open(window.location.pathname);
