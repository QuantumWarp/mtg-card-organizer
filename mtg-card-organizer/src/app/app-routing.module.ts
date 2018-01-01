import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
      { path: 'cards', loadChildren: 'app/card/card.module#CardModule' },
      { path: 'life-counter', loadChildren: 'app/life-counter/life-counter.module#LifeCounterModule' },
      { path: 'collections', loadChildren: 'app/collection/collection.module#CollectionModule' },
    ]),
  ]
})
export class AppRoutingModule { }
