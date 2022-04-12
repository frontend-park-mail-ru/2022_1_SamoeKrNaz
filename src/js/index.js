'use strict';

import Dispatcher from '../modules/dispatcher.js';
import {ProfileActions} from '../modules/actions.js';
import {Url} from '../constants/constants.js';
import router from '../modules/router.js';

import Profile from '../stores/profile.js';
import Boards from '../stores/boards.js';

import LoginPage from '../views/loginPage/loginPage.js';
import BoardsPage from '../views/boardsPage/boardsPage.js';
import SignupPage from '../views/signupPage/signupPage.js';
import BoardPage from '../views/boardPage/boardPage.js';
import NotFoundPage from '../views/notFoundPage/notFoundPage.js';

if (!Profile.isLoad()) {
	Dispatcher.dispatch({
		type: ProfileActions.loadProfile,
	});
}

router.register(Url.index, LoginPage);
router.register(Url.base, BoardsPage);
router.register(Url.login, LoginPage);
router.register(Url.signup, SignupPage);
router.register(Url.notFound, NotFoundPage);
router.register(Url.board, BoardPage);
// router.register(Url.board, boardPageRender);

router.open(window.location.pathname);
