import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { NavigatorComponent } from './navigation/navigator.component';
import { NavBarComponent } from './navigation/nav-bar.component';

@NgModule({
  declarations: [
    NavBarComponent,
    NavigatorComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    NavBarComponent,
    NavigatorComponent,
  ]
})
export class GeneralModule { }
