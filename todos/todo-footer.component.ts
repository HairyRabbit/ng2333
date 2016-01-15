import { Component, OnInit } from 'angular2/core'
import { ROUTER_DIRECTIVES, RouteParams } from 'angular2/router'

import { Todo, TodosService, isActive } from './todos.service'

@Component({
		selector: 'todo-footer',
		templateUrl: 'app/todos/todo-footer.component.html',
		directives: [ROUTER_DIRECTIVES],
})

export class TodoFooterComponent {
		
		constructor(private _service: TodosService,
								private _params: RouteParams) {}

		/**
		 * todos 数量
		 *
		 * @return {Number}
		 */
		getTodosCount(): number {
				return this._service.todos.length
		}

		/**
		 * todos 未完成的数量
		 *
		 * @return {Number}
		 */
		getActiveTodosCount(): number {
				return this._service.todos.filter(isActive).length
		}

		/**
		 * 清除所有已完成的 todos
		 *
		 * @return {Void}
		 */
		deleteCompletedTodos(): void {
				this._service.deleteCompletedTodos()
		}
}

