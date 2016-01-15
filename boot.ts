import { enableProdMode } from 'angular2/core'
import { ROUTER_PROVIDERS } from 'angular2/router'
import { bootstrap } from 'angular2/platform/browser'

import { AppComponent } from './app.component'

enableProdMode()

bootstrap(AppComponent, [ROUTER_PROVIDERS])
