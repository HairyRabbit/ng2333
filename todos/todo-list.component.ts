import { Component } from 'angular2/core'
import { RouteParams } from 'angular2/router'

import { Todo, TodosService } from './todos.service'
import { TodoItemComponent } from './todo-item.component'

@Component({
		selector: 'todo-list',
		templateUrl: 'app/todos/todo-list.component.html',
		directives: [TodoItemComponent]
})

export class TodoListComponent {

		todos: Todo[]
		
		constructor(private _service: TodosService,
								private _params: RouteParams) {}

		/**
		 * 根据路由动态段 status 获取过滤的 todos
		 *
		 * @return {[Todo]}
		 */
		getTodos(): Todo[] {
				// 路由参数
				const status = this._params.get('status')
				// 请求列表
				return this._service.getTodos(status)
		}
}
