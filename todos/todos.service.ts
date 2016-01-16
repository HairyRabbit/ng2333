import { Injectable } from 'angular2/core'
import { truth } from '../util'

/**
 * 后端响应
 */
export class Response {
		datetime: number
		error: string
		constructor(err: string = '',
								timestamp: number = +new Date) {
				// 时间截
				this.datetime = timestamp
				// 错误信息
				this.error = err
		}
}

/**
 * Todo 状态枚举
 */
export enum TodoStatus {
		// 未完成
		Active,
		// 已完成
		Completed
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

function idTodo(todo: Todo): boolean {
		return true
}

/**
 * 根据 state 返回 TodoStatus
 *
 * @param {String} state
 * @return {TodoStatus}
 */
export function matchStatus(state: string): TodoStatus {
		return ((state) => {
				switch(state) {
				case 'active': return TodoStatus.Active
				case 'completed': return TodoStatus.Completed
				default: throw new Error('Does not match enum TodoStatus')
				}
		})(state)
}

/**
 * Todo 类型
 */
export interface TodoInterface {
		id: string
		content: string
		status: TodoStatus
}

/**
 * Todo
 */
export class Todo implements TodoInterface {
		// id
		id: string
		// 内容
		content: string
		// 状态
		status: TodoStatus

		constructor(content: string,
								status: TodoStatus = TodoStatus.Active) {
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
		getTodos(status?: string): Todo[] {
				// 过滤列表
				return this.todos.filter((todo) => {
						switch(todo.status) {
						case TodoStatus.Active: return isActive(todo)
						case TodoStatus.Completed: return isCompleted(todo)
						default: return true
						}
				})
		}

		/**
		 * 创建新 todo
		 *
		 * @param {String} content - todo 内容
		 * @return {Promise}
		 */
		createTodo(content: string): Promise<Response> {
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
		deleteCompletedTodos(): Promise<Response> {
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
		toggleTodosStatus(state: boolean): Promise<Response> {
				// 函数 返回一个更改 status 后的 todo， 用于 map
				const todoIter: (todo: Todo)=>void = (todo) => {
						todo.status = state ? TodoStatus.Completed : TodoStatus.Active
				}
				// 更新全部 todo
				this.todos.forEach(todoIter)
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
		deleteTodo(todo: Todo):  Promise<Response> {
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
		toggleTodoState(todo: Todo):  Promise<Response> {
				const todos = this.todos
				const idx = this.findTodoIndex(todo)

				this.todos[idx].status = this.reverseState(this.todos[idx].status)

				/*
				this.todos = [].concat(todos.slice(0, idx)).concat(
						new Todo(todo.content, this.reverseState(todo.status), todo.id)
				).concat(todos.slice(idx + 1))
				*/

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
