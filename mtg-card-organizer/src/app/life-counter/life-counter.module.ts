import { NgModule, } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';
import { LifeCounterViewComponent } from './view/life-counter-view.component';
import { LifeCounterControllerComponent } from './controller/life-counter-controller.component';
import { LifeCounterSingleComponent } from './single/life-counter-single.component';

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
