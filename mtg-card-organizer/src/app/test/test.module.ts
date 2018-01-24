import { NgModule } from '@angular/core';

import { MockingModule } from './mocking.module';

@NgModule({
  imports: [
    MockingModule.forRoot(),
  ]
})
export class TestModule { }
