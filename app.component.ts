import { Component } from 'angular2/core'
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router'
import { TodosComponent } from './todos/todos.component'
import { TodosService } from './todos/todos.service'

@Component({
		selector: 'my-app',
		directives: [ROUTER_DIRECTIVES],
		providers: [TodosService],
		templateUrl: 'app/app.component.html'
})

@RouteConfig([
		{
				path: '/todos',
				name: 'Todos',
				component: TodosComponent,
				useAsDefault: true
		},
		{
				path: '/todos/:status',
				name: 'TodosStatus',
				component: TodosComponent
		}
])

export class AppComponent {}
