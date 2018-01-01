import { NgModule, } from '@angular/core';
import { SharedModule } from '../general/shared.module';

import { RouterModule } from '@angular/router';
import { LifeCounterViewComponent } from './life-counter-view/life-counter-view.component';
import { LifeCounterControllerComponent } from './life-counter-controller/life-counter-controller.component';
import { LifeCounterSingleComponent } from './life-counter-single/life-counter-single.component';

@NgModule({
  declarations: [
    LifeCounterViewComponent,
    LifeCounterControllerComponent,
    LifeCounterSingleComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: LifeCounterViewComponent }
    ]),
  ]
})
export class LifeCounterModule {}
