import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { Error404Component } from './error-404.component';

@NgModule({
  declarations: [
    Error404Component,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '404',
        component: Error404Component
      }
    ]),
  ]
})
export class ErrorModule {}
