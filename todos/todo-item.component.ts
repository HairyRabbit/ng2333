import { Component, Input } from 'angular2/core'
import { Todo, TodosService } from './todos.service'

@Component({
		selector: 'todo-item',
		styles: [`
						 .destory {
								 opacity: 0;
						 }
						 .is-mouseOn:hover .destory {
								 opacity: 1;
						 }
						 `],
		templateUrl: 'app/todos/todo-item.component.html'
})

export class TodoItemComponent {
		@Input()
		todo

		isEdit: boolean = false
		
		constructor(private _service: TodosService) {}

		/**
		 * 切换 todo 的状态
		 *
		 * @return {Void}
		 */
		toggleState(): void {
				this._service.toggleTodoState(this.todo)
		}

		/**
		 * 删除 todo
		 *
		 * @return {Void}
		 */
		deleteTodo(): void {
				this._service.deleteTodo(this.todo)
		}

		changeEditState(evt: any): void {
				this.isEdit = !this.isEdit
		}
}
