import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { MainNavBarComponent } from './main-nav-bar/main-nav-bar.component';
import { MainSideNavComponent } from './main-side-nav/main-side-nav.component';

@NgModule({
  declarations: [
    MainNavBarComponent,
    MainSideNavComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    MainNavBarComponent,
    MainSideNavComponent,
  ]
})
export class GeneralModule {}