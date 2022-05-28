import taskBlock from '../../components/taskBlock/taskBlock.hbs';

import BaseView from '../baseView';
import EventBus from '../../modules/eventBus';
import {BoardActions, Events, TaskActions} from '../../modules/actions';
import Dispatcher from '../../modules/dispatcher';
import Board from '../../stores/board';
import {ProfileStore, TaskStore} from '../../modules/types';
import Profile from '../../stores/profile';
import {copyLength} from '../../constants/constants';

/**
 * Класс, реализующий страницу логина.
 */
export default new (class TaskView extends BaseView {
	/**
	 * @constructor
	 */
	constructor() {
		super([
			{
				type: 'click',
				className: 'taskBlock__close',
				isArray: true,
				func: () => {
					this.close();
				},
			},
			{
				type: 'click',
				className: 'taskBlock__bg',
				func: () => {
					this.close();
				},
			},
			{
				type: 'input',
				className: 'taskBlock__title-input',
				func: (e) => {
					const hidden = (<HTMLSpanElement>document.querySelector('.taskBlock__hidden'));
					hidden.innerText = e.target.value;
					e.target.style.height = hidden.getClientRects()[0].height + 'px';
				},
			},
			{
				type: 'input',
				className: 'taskBlock__comment-textarea-add',
				func: (e) => {
					const hidden = (<HTMLSpanElement>document.querySelector('[data-hidden="' + e.target.dataset.id + '"]'));
					hidden.innerText = e.target.value;
					e.target.style.height = hidden.getClientRects()[0].height + 'px';
				},
			},
			{
				type: 'blur',
				className: 'taskBlock__title-input',
				func: (e) => {
					Dispatcher.dispatch({
						type: TaskActions.updateTitle,
						title: e.target.value,
					});
				},
			},
			{
				type: 'keydown',
				className: 'taskBlock__title-input',
				func: (e) => {
					if (e.keyCode === 13) {
						e.target.blur();
					}
				},
			},
			{
				type: 'blur',
				className: 'taskBlock__textarea',
				func: (e) => {
					Dispatcher.dispatch({
						type: TaskActions.changeDescription,
						data: e.target.value,
					});
				},
			},
			{
				type: 'keydown',
				className: 'taskBlock__textarea',
				func: (e) => {
					if (e.keyCode === 13) {
						e.target.blur();
					}
				},
			},
			{
				type: 'blur',
				className: 'taskBlock__checklist-item-text',
				isArray: true,
				func: (e) => {
					Dispatcher.dispatch({
						type: TaskActions.changeCheckList,
						title: e.target.value,
						id: e.target.dataset.id,
					});
				},
			},
			{
				type: 'keydown',
				className: 'taskBlock__checklist-item-text',
				isArray: true,
				func: (e) => {
					if (e.keyCode === 13) {
						e.target.blur();
					}
				},
			},
			{
				type: 'blur',
				className: 'taskBlock__checklist-title',
				isArray: true,
				func: (e) => {
					Dispatcher.dispatch({
						type: TaskActions.changeCheckListTitle,
						title: e.target.value,
						id: e.target.dataset.id,
					});
				},
			},
			{
				type: 'keydown',
				className: 'taskBlock__checklist-title',
				isArray: true,
				func: (e) => {
					if (e.keyCode === 13) {
						e.target.blur();
					}
				},
			},
			{
				type: 'blur',
				className: 'taskBlock__comment-textarea-add',
				isArray: true,
				func: (e) => {
					Dispatcher.dispatch({
						type: TaskActions.changeComment,
						title: e.target.value,
						id: e.target.dataset.id,
					});
				},
			},
			{
				type: 'keydown',
				className: 'taskBlock__comment-textarea-add',
				isArray: true,
				func: (e) => {
					if (e.keyCode === 13) {
						e.target.blur();
					}
				},
			},
			{
				type: 'keydown',
				className: 'taskBlock__comment-textarea',
				isArray: true,
				func: (e) => {
					if (e.keyCode === 13) {
						e.target.blur();
						if (e.target.value != '') {
							Dispatcher.dispatch({
								type: TaskActions.addComment,
								title: e.target.value,
							});
						}
						e.target.value = '';
					}
				},
			},
			{
				type: 'click',
				className: 'taskBlock__user',
				isArray: true,
				func: (e) => {
					Dispatcher.dispatch({
						type: TaskActions.addUser,
						id: e.target.dataset.id,
					});
				},
			},
			{
				type: 'click',
				className: 'taskBlock__img-block-delete',
				isArray: true,
				func: (e) => {
					Dispatcher.dispatch({
						type: TaskActions.removeUser,
						id: e.target.dataset.id,
					});
				},
			},
			{
				type: 'click',
				className: 'taskBlock__button',
				func: (e) => {
					Dispatcher.dispatch({
						type: TaskActions.addChecklist,
					});
				},
			},
			{
				type: 'click',
				className: 'taskBlock__button-active',
				isArray: true,
				func: (e) => {
					Dispatcher.dispatch({
						type: TaskActions.addItem,
						id: e.target.dataset.id,
					});
				},
			},
			{
				type: 'click',
				className: 'taskBlock__checklist-delete',
				isArray: true,
				func: (e) => {
					Dispatcher.dispatch({
						type: TaskActions.removeChecklist,
						id: e.target.dataset.id,
					});
				},
			},
			{
				type: 'click',
				className: 'taskBlock__item-delete',
				isArray: true,
				func: (e) => {
					Dispatcher.dispatch({
						type: TaskActions.removeItem,
						id: e.target.dataset.id,
					});
				},
			},
			{
				type: 'click',
				className: 'taskBlock__item-check',
				isArray: true,
				func: (e) => {
					Dispatcher.dispatch({
						type: TaskActions.checkItem,
						id: e.target.dataset.id,
					});
				},
			},
			{
				type: 'click',
				className: 'taskBlock__comment-text-delete',
				isArray: true,
				func: (e) => {
					Dispatcher.dispatch({
						type: TaskActions.deleteComment,
						id: e.target.dataset.id,
					});
				},
			},
			{
				type: 'change',
				className: 'taskBlock__date',
				isArray: true,
				func: (e) => {
					Dispatcher.dispatch({
						type: TaskActions.changeDate,
						data: e.target.value,
					});
				},
			},
			{
				type: 'click',
				className: 'createModal__settings_link_icon_task',
				isArray: false,
				func: () => {
					this.copyLink();
				},
			},
			{
				type: 'change',
				id: 'attachmentUpload',
				func: async (e) => {
					Dispatcher.dispatch({
						type: TaskActions.uploadAttachment,
						data: e.target.files[0],
					});
				},
			},
			{
				type: 'click',
				isArray: true,
				className: 'taskBlock__attachment-delete',
				func: async (e) => {
					Dispatcher.dispatch({
						type: TaskActions.removeAttachment,
						id: e.target.dataset.id,
					});
				},
			},
			{
				type: 'click',
				isArray: true,
				className: 'taskBlock__attachment-download',
				func: async (e) => {
					Dispatcher.dispatch({
						type: TaskActions.downloadAttachment,
						id: e.target.closest('div').dataset.id,
					});
				},
			},
			{
				type: 'focus',
				isArray: true,
				querySelector: '[data-block-update="true"]',
				func: async (e) => {
					Dispatcher.dispatch({
						type: TaskActions.blockUpdate,
					});
				},
			},
			{
				type: 'blur',
				isArray: true,
				querySelector: '[data-block-update="true"]',
				func: async (e) => {
					Dispatcher.dispatch({
						type: TaskActions.unBlockUpdate,
					});
				},
			},
		]);

		EventBus.subscribe(Events.taskUpdate, this.onUpdate.bind(this));
		EventBus.subscribe(Events.taskDelete, this.close.bind(this));
	}

	/**
	 * Метод отвечающий за генерацию View
	 * @param {object} e
	 */
	render(e): void {
		const block = document.querySelector('.taskBlockContainer');
		block.innerHTML = taskBlock();
		block.classList.toggle('taskBlock_active');

		this._createListeners();

		Dispatcher.dispatch({
			type: TaskActions.loadTask,
			data: e.target.dataset.id,
		});
	}

	/**
	 * Метод отвечающий за генерацию View по ссылке
	 * @param {number} data
	 */
	renderLink(data): void {
		const block = document.querySelector('.taskBlockContainer');
		block.innerHTML = taskBlock();

		this._createListeners();

		Dispatcher.dispatch({
			type: TaskActions.loadTask,
			data: data,
		});
		block.classList.add('taskBlock_active');
	}

	/**
	 * Метод, вызывающийся при обновлении стора досок
	 * @param {TaskStore} data состояние стора
	 */
	onUpdate(data: TaskStore = null): void {
		this.removeListeners();

		const addUsers = Board.getUsers().slice(0);

		addUsers.forEach((user, i) => {
			data.append_users?.map((userTwo) => {
				if (userTwo.idu === user.idu) {
					delete addUsers[i];
				}
			});
		});

		data.comment.map((comm) => {
			if (comm.user.username === Profile.getState().username) {
				comm.isYou = true;
			} else {
				comm.isYou = false;
			}
		});

		const block = document.querySelector('.taskBlockContainer');
		block.innerHTML = taskBlock({
			...data,
			deskTitle: Board.getTitle(),
			addUsers: addUsers,
			thisUser: Profile.getState(),
		});

		const textarea = (<HTMLTextAreaElement>document.querySelector('.taskBlock__title-input'));
		const hidden = (<HTMLSpanElement>document.querySelector('.taskBlock__hidden'));
		hidden.innerText = textarea.value;
		textarea.style.height = hidden.getClientRects()[0].height + 'px';

		const areaItems = document.querySelectorAll('.taskBlock__comment-textarea-add');

		for (const key in areaItems) {
			if (areaItems.hasOwnProperty(key)) {
				const textarea2 = (<HTMLTextAreaElement>areaItems[key]);
				const hidden2 = (<HTMLSpanElement>document.querySelector('[data-hidden="' + textarea2.dataset.id + '"]'));
				hidden2.innerText = textarea2.value;
				textarea2.style.height = hidden2.getClientRects()[0].height + 'px';
			}
		}

		this._createListeners();
	}

	/**
	 * Закрыть таску
	 */
	close() {
		const block = document.querySelector('.taskBlockContainer');
		block.classList.toggle('taskBlock_active');

		Dispatcher.dispatch({
			type: BoardActions.unBlockUpdate,
		});

		Dispatcher.dispatch({
			type: BoardActions.loadBoard,
		});
	}

	/**
	 * Копирование ссылки для присоединения
	 */
	copyLink() {
		const copyText = document.getElementsByClassName('createModal__settings_input_link_task')[0] as HTMLInputElement;

		copyText.select();
		copyText.setSelectionRange(0, copyLength);

		navigator.clipboard.writeText(copyText.value);
	}
});
