import { NgModule, } from '@angular/core';
import { SharedModule } from '../general/shared.module';

import { RouterModule } from '@angular/router';
import { LifeCounterViewComponent } from './life-counter-view.component';

@NgModule({
  declarations: [
    LifeCounterViewComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'life-counter', component: LifeCounterViewComponent }
    ]),
  ]
})
export class LifeCounterModule {}
