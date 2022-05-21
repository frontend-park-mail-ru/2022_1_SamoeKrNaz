import Dispatcher from './dispatcher';
import {BoardActions} from './actions';

/**
 * Класс, который управляет всеми drag and drop на странице доски для листов
 */
export class DndEvent {
	targets: Array<{
		target: HTMLElement,
		mouseDownTarget: HTMLElement,
		parentTarget: HTMLElement,
	}>;
	selectPosition: number;

	/**
	 * Конструктор, который создает обработчки
	 * @param {string} targetClass Класс элемента, который является блоком dnd
	 * @param {string} mouseTargetClass Класс элемента, который является блоком, на который нажимают при перетаскивании
	 */
	constructor(targetClass: string, mouseTargetClass: string) {
		const columns = document.querySelectorAll('.' + targetClass);

		this.targets = [];

		for (const key in columns) {
			if (columns.hasOwnProperty(key)) {
				const newTarget = {
					target: (<HTMLElement> columns[key]),
					mouseDownTarget: (<HTMLElement> columns[key].querySelector('.' + mouseTargetClass)),
					parentTarget: (<HTMLElement> columns[key].parentElement),
				};

				this.targets.push(newTarget);

				this.addEventsForLists(newTarget.target, newTarget.mouseDownTarget);
			}
		}
	}

	/**
	 * Создание событий на перетаскивание
	 * @param {HTMLElement} target
	 * @param {HTMLElement} mouseDownTarget
	 */
	addEventsForLists(target: HTMLElement, mouseDownTarget: HTMLElement) {
		const start = {x: 0, y: 0};
		const offsetPos = {x: 0, y: 0};
		const position = Number(target.dataset.position) - 1;
		let newPosition = 0;

		const onMouseMove = (e: MouseEvent) => {
			document.addEventListener('mouseup', onMouseUp);

			target.classList.add('desk__column-dragged');

			window.getSelection().removeAllRanges();

			this.targets.map((el) => el.target.hidden = true);
			const nowWeSee = document.elementFromPoint(e.clientX, e.clientY);
			this.targets.map((el) => el.target.hidden = false);

			offsetPos.x = e.clientX - start.x;
			offsetPos.y = e.clientY - start.y;

			target.style.transform = 'translate(' + offsetPos.x + 'px, ' + offsetPos.y + 'px)';

			this.targets.forEach((el, i) => {
				if (nowWeSee == el.parentTarget) {
					this.move(position, i);
					newPosition = i + 1;
				}
			});
		};

		const onMouseUp = (e: MouseEvent) => {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);

			Dispatcher.dispatch({
				type: BoardActions.moveList,
				id: Number(target.dataset.id),
				data: {
					new: newPosition,
					old: position,
				},
			});
		};

		const onMouseLeave = () => {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseLeave);
		};

		const onMouseDown = (e: MouseEvent) => {
			start.x = e.clientX;
			start.y = e.clientY;

			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseLeave);
		};

		mouseDownTarget.addEventListener('mousedown', onMouseDown);
	}

	/**
	 * Визуальное перемещение всех блоков относительно перемещения перетаскиваемого блока
	 * @param {number} start
	 * @param {number} end
	 */
	move(start: number, end: number) {
		this.targets.forEach((el, i) => {
			if (start < i && i <= end) {
				el.target.style.transform = 'translateX(-' + (el.target.clientWidth + 30) + 'px)';
			} else if (end <= i && i < start) {
				el.target.style.transform = 'translateX(' + (el.target.clientWidth + 30) + 'px)';
			} else if (i != start) {
				el.target.style.transform = 'none';
			}
		});
	}
}

/**
 * Класс, который управляет всеми drag and drop на странице доски для тасок
 */
export class DndEventForTask {
	targets: Array<{
		target: HTMLElement,
		targetParent: HTMLElement,
	}>;

	/**
	 * Конструктор, который создает обработчки
	 * @param {string} targetClass Класс элемента, который является блоком dnd
	 */
	constructor(targetClass: string) {
		const columns = document.querySelectorAll('.' + targetClass);

		this.targets = [];

		for (const key in columns) {
			if (columns.hasOwnProperty(key)) {
				const newTarget = {
					target: (<HTMLElement> columns[key]),
					targetParent: columns[key].parentElement,
				};

				this.targets.push(newTarget);

				this.addEventsForTask(newTarget.target);
			}
		}
	}

	/**
	 * Создание событий на перетаскивание
	 * @param {HTMLElement} target
	 */
	addEventsForTask(target: HTMLElement) {
		const start = {x: 0, y: 0};
		const offsetPos = {x: 0, y: 0};
		const position = Number(target.dataset.position) - 1;
		let newPosition = Number(target.dataset.position);
		let newList = Number(target.dataset.idl);

		const onMouseMove = (e: MouseEvent) => {
			document.addEventListener('mouseup', onMouseUp);

			target.classList.add('desk__task-dragged');

			window.getSelection().removeAllRanges();

			target.hidden = true;
			const nowWeSee = document.elementFromPoint(e.clientX, e.clientY);
			target.hidden = false;

			offsetPos.x = e.clientX - start.x;
			offsetPos.y = e.clientY - start.y;

			target.style.transform = 'translate(' + offsetPos.x + 'px, ' + offsetPos.y + 'px)';

			this.targets.forEach((el, i) => {
				if (nowWeSee == el.target) {
					this.targets.map((el) => el.target.style.margin = '12px 0');

					el.target.style.margin = (target.clientHeight + 25) + 'px 0 0';
					newPosition = Number(el.target.dataset.position);
					newList = Number(el.target.dataset.idl);
				}
			});
		};

		const onMouseUp = (e: MouseEvent) => {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);

			Dispatcher.dispatch({
				type: BoardActions.moveTask,
				id: Number(target.dataset.id),
				data: {
					newPos: newPosition,
					oldPos: Number(target.dataset.position),
					newList: newList,
					oldList: Number(target.dataset.idl),
				},
			});
		};

		const onMouseLeave = () => {
			document.removeEventListener('mouseup', onMouseLeave);
			document.removeEventListener('mousemove', onMouseMove);
		};

		const onMouseDown = (e: MouseEvent) => {
			start.x = e.clientX;
			start.y = e.clientY;

			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseLeave);
		};

		target.addEventListener('mousedown', onMouseDown);
	}

	/**
	 * Визуальное перемещение всех блоков относительно перемещения перетаскиваемого блока
	 * @param {number} start
	 * @param {number} end
	 */
	move(start: number, end: number) {
		this.targets.forEach((el, i) => {
			if (start < i && i <= end) {
				el.target.style.transform = 'translateX(-' + (el.target.clientWidth + 30) + 'px)';
			} else if (end <= i && i < start) {
				el.target.style.transform = 'translateX(' + (el.target.clientWidth + 30) + 'px)';
			} else if (i != start) {
				el.target.style.transform = 'none';
			}
		});
	}
}
