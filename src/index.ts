'use strict';

import Dispatcher from './modules/dispatcher';
import {ProfileActions} from './modules/actions';
import {Url} from './constants/constants';
import router from './modules/router';

import Profile from './stores/profile';
import Boards from './stores/boards';
import Board from './stores/board';

import LoginPage from './views/loginPage/loginPage';
import BoardsPage from './views/boardsPage/boardsPage';
import SignupPage from './views/signupPage/signupPage';
import BoardPage from './views/boardPage/boardPage';
import NotFoundPage from './views/notFoundPage/notFoundPage';
import NoNetworkPage from './views/noNetworkPage/noNetworkPage';

Board;
Boards;

if (!Profile.isLoad()) {
	Dispatcher.dispatch({
		type: ProfileActions.loadProfile,
	});
}

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('../sw.js', {scope: '/'})
		.then((registration) => {
			console.log('sw registration on scope:', registration.scope);
		})
		.catch((err) => {
			console.error(err);
		});
}

router.register(Url.index, LoginPage);
router.register(Url.base, BoardsPage);
router.register(Url.login, LoginPage);
router.register(Url.signup, SignupPage);
router.register(Url.notFound, NotFoundPage);
router.register(Url.board, BoardPage);
router.register(Url.noNetwork, NoNetworkPage);
