import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';

import { NavigatorComponent } from './navigation/navigator.component';
import { NavBarComponent } from './navigation/nav-bar.component';
import { ContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ContentComponent,
    NavBarComponent,
    NavigatorComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ],
  exports: [
    ContentComponent,
    NavBarComponent,
    NavigatorComponent,
  ]
})
export class GeneralModule { }
