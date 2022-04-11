'use strict';

import Dispatcher from '../modules/dispatcher.js';
import {ProfileActions} from '../modules/actions.js';
import {Url} from '../constants/constants.js';
import router from '../modules/router.js';

import Profile from '../stores/profile.js';

import LoginPage from '../views/loginPage/loginPage.js';
import {basePageRender} from '../views/basePage/basePage.js';
import SignupPage from '../views/signupPage/signupPage.js';
import {boardPageRender} from '../views/boardPage/boardPage.js';

if (!Profile.isLoad()) {
	Dispatcher.dispatch({
		type: ProfileActions.loadProfile,
	});
}

router.register(Url.index, LoginPage);
// router.register(Url.base, basePageRender);
router.register(Url.login, LoginPage);
router.register(Url.signup, SignupPage);
// router.register(Url.board, boardPageRender);

router.open(window.location.pathname);
