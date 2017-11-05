import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { MainNavBarComponent } from './main-nav-bar/main-nav-bar.component';

@NgModule({
  declarations: [
    MainNavBarComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    MainNavBarComponent
  ]
})
export class GeneralModule {}