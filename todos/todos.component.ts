import { Component } from 'angular2/core'
import { TodoHeaderComponent } from './todo-header.component'
import { TodoFooterComponent } from './todo-footer.component'
import { TodoListComponent } from './todo-list.component'

@Component({
		selector: 'todos',
		directives: [
				TodoHeaderComponent,
				TodoFooterComponent,
				TodoListComponent
		],
		templateUrl: 'app/todos/todos.component.html'
})

export class TodosComponent { }
