import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { AuthGuard } from './authentication/services/auth.guard';
import { StandardLayoutComponent } from './core/layouts/standard-layout.component';

const testRoutes: Route[] = environment.testSettings && environment.testSettings.includeTestModule ?
  [{
    path: 'test',
    loadChildren: 'app/test/test.module#TestModule',
  }] : [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/containers',
        pathMatch: 'full',
      },
      {
        path: 'auth',
        loadChildren: 'app/authentication/authentication.module#AuthenticationModule',
      },
      {
        path: 'error',
        loadChildren: 'app/error/error.module#ErrorModule',
      },
      {
        path: '',
        component: StandardLayoutComponent,
        canActivate: [ AuthGuard ],
        children: [
          ...testRoutes,
          {
            path: 'admin',
            loadChildren: 'app/admin/admin.module#AdminModule',
          },
          {
            path: 'bookmarks',
            loadChildren: 'app/bookmark/bookmark.module#BookmarkModule',
          },
          {
            path: 'containers',
            loadChildren: 'app/container/container.module#ContainerModule',
          },
          {
            path: 'collections',
            loadChildren: 'app/collection/collection.module#CollectionModule',
          },
          {
            path: 'decks',
            loadChildren: 'app/deck/deck.module#DeckModule',
          },
          {
            path: 'cards',
            loadChildren: 'app/card/card.module#CardModule',
          },
          {
            path: 'life-counter',
            loadChildren: 'app/life-counter/life-counter.module#LifeCounterModule',
          },
        ]
      },
      {
        path: '**',
        redirectTo: '/error/404',
      }
    ]),
  ]
})
export class AppRoutingModule { }
