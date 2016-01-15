import { Injectable } from 'angular2/core'
import { truth } from '../util'

/**
 * 后端响应
 */
class Response {
		// 时间截
		datetime: number
		// 错误信息
		error: string
		
		constructor(private error: string = '') {
				this.datetime = +new Date
				this.error = error
		}
}

/**
 * Todo 类型
 */
export interface Todo {
		id: string
v		content: string
		status: boolean
}

/**
 * Todo 状态枚举
 */
export enum TodoStatus {
		// 未完成
		Active = 'active',
		// 已完成
		Completed = 'completed'
}

/**
 * Todo 状态是否为未完成
 *
 * @param {Todo} todo
 * @return {Boolean}
 */
export function isActive(todo: Todo): boolean {
		return todo.status === TodoStatus.Active
}

/**
 * Todo 状态是否为已完成
 *
 * @param {Todo} todo
 * @return {Boolean}
 */
export function isCompleted(todo: Todo): boolean {
		return todo.status === TodoStatus.Completed
}

/**
 * Todo
 */
class Todo {
		// id
		id: string
		// 内容
		content: string
		// 状态
		status: TodoStatus

		constructor(
				private content: string,
				private status: TodoStatus = TodoStatus.Active,
				private id?: string
		) {
				this.id = uuid.v4()
				this.content = content.trim()
				this.status = status
		}
}

@Injectable()
export class TodosService {

		// todos 数据
		todos: Todo[]
		
		constructor() {
				this.todos = TODOS
		}

		/**
		 * 获取 todos 列表
		 *
		 * @return {Promise}
		 */
		getTodos(status?: string): Promise {
				// 计算属性 根据 status 返回一个谓词函数，用于过滤列表
				const filter: (status: string)=>boolean = ((status) => {
						switch(status) {
						case TodoStatus.Active: return isActive
						case TodoStatus.Completed: return isCompleted
						default: return truth
						}
				})(status)
				// 过滤列表
				return this.todos.filter(filter)
		}

		/**
		 * 创建新 todo
		 *
		 * @param {String} content - todo 内容
		 * @return {Promise}
		 */
		createTodo(content: string): Promise {
				// todo
				const newTodo: Todo = new Todo(content)
				// 添加到列表头部
				this.todos = [].concat(newTodo).concat(this.todos)
				// 响应请求
				const res = new Response()
				return Promise.resolve(res)
		}		

		/**
		 * 清除所有已完成的 todos
		 *
		 * @return {Promise}
		 */
		deleteCompletedTodos(): Promise {
				// 过滤掉已完成的 todos
				this.todos = this.todos.filter(isActive)
				
				const res = new Response()
				return Promise.resolve(res)
		}
		
		/**
		 * 切换全部 todo 的 status
		 *
		 * @param {Boolean} state
		 * @return {Promise}
		 */
		toggleTodosStatus(state: boolean): Promise {
				// 函数 返回一个更改 status 后的 todo， 用于 map
				const todoIter: (todo: Todo)=>Todo = (todo) => new Todo(
						todo.content,
						state ? TodoStatus.Completed : TodoStatus.Active,
						todo.id
				)
				// 更新全部 todo
				this.todos = this.todos.map(todoIter)
				// 响应请求
				const res = new Response()
				return Promise.resolve(res)
		}

		/**
		 * 查找 todo 所在 todos 的 index
		 *
		 * @require this.todos
		 * @params {Todo} todo
		 * @return {Number}
		 */
		findTodoIndex(todo: Todo): number {
				const id = todo.id
				const isEqId: (todo: Todo)=>boolean = (todo) => todo.id === id
				return this.todos.findIndex(isEqId)
		}

		/**
		 * 反转 state
		 *
		 * @params {String} status
		 * @return {TodoStatus}
		 */
		reverseState(status): TodoStatus {
				return status === TodoStatus.Active ? TodoStatus.Completed : TodoStatus.Active
		}
		
		/**
		 * 删除 todo
		 *
		 * @params {Todo} todo
		 * @return {Promise}
		 */
		deleteTodo(todo: Todo): Promise {
				const todos = this.todos
				const idx = this.findTodoIndex(todo)
				this.todos = [].concat(todos.slice(0, idx)).concat(todos.slice(idx + 1))
				// 响应请求
				const res = new Response()
				return Promise.resolve(res)
		}

		/**
		 * 切换 todo 的 state
		 *
		 * @params {Todo} todo
		 * @return {Promise}
		 */
		toggleTodoState(todo: Todo): Promise {
				const todos = this.todos
				const idx = this.findTodoIndex(todo)
				
				this.todos = [].concat(todos.slice(0, idx)).concat(
						new Todo(todo.content, this.reverseState(todo.status), todo.id)
				).concat(todos.slice(idx + 1))

				// 响应请求
				const res = new Response()
				return Promise.resolve(res)
		}
}

/**
 * 静态数据
 */
const TODOS: Todo[] = [
		new Todo('Love Javascript.'),
		new Todo('Love Haskell.', TodoStatus.Completed),
		new Todo('Love Clojure.', TodoStatus.Completed),
		new Todo('Love Saclc.'),
		new Todo('Love Julia.', TodoStatus.Completed),
		new Todo('Read SICP(Part 2).')
]
