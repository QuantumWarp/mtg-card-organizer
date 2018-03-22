import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { StandardLayoutComponent } from './general/layouts/standard-layout.component';
import { AuthGuard } from './authentication/services/auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home',
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
          {
            path: 'home',
            component: HomeComponent
          },
          {
            path: 'admin',
            loadChildren: 'app/admin/admin.module#AdminModule',
          },
          {
            path: 'cards',
            loadChildren: 'app/card/card.module#CardModule',
          },
          {
            path: 'life-counter',
            loadChildren: 'app/life-counter/life-counter.module#LifeCounterModule',
          },
          {
            path: 'collections',
            loadChildren: 'app/collection/collection.module#CollectionModule',
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
