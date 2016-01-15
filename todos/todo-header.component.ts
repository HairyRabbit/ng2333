import { Component, OnInit } from 'angular2/core'
import { eitherError } from '../util'
import { Todo, TodosService, isCompleted } from './todos.service'

@Component({
		selector: 'todo-header',
		templateUrl: 'app/todos/todo-header.component.html'
})

export class TodoHeaderComponent {

		constructor(private _service: TodosService) {}

		/**
		 * 新的todo，用ngModel双向绑定在input上
		 *
		 * @var {String}
		 */
		newTodo: string

		/**
		 * 重置newTodo为''
		 *
		 * @return {Void}
		 */
		resetNewTodo(): void {
				this.newTodo = ''
		}
		
		/**
		 * 创建新todo，调用createTodo方法，创建成功后调用resetNewTodo
		 *
		 * @require {Function} resetNewTodo
		 * @return {Void}
		 */
		createTodo(): void {
				// 输入的内容
				const content = this.newTodo.trim()
				// 请求后端
				this._service.createTodo(content)
						.then(eitherError)
						.then(this.resetNewTodo.bind(this))
		}

		/**
		 * 计算属性，返回todos是否全部完成
		 *
		 * @require {Function} isCompleted
		 * @return {Boolean}
		 */
		checkTodosStatus(): boolean {
				return this._service.todos.every(isCompleted)
		}

		/** 
		 * 全选，根据checkbox的checked切换全部todo的状态
		 *
		 * @param {Any} evt - event对象
		 * @return {Void}
		 */
		toggleTodosStatus(evt: any): void {
				this._service.toggleTodosStatus(evt.target.checked)
		}
}

