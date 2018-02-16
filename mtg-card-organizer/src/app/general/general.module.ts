import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContentComponent } from './content/content.component';
import { NavBarComponent } from './navigation/nav-bar.component';
import { NavigatorComponent } from './navigation/navigator.component';
import { SharedModule } from './shared.module';
import { ConfirmComponent } from './components/confirm.component';
import { NavNodeComponent } from './navigation/nav-node.component';

@NgModule({
  declarations: [
    ContentComponent,
    NavBarComponent,
    NavNodeComponent,
    NavigatorComponent,
    ConfirmComponent,
  ],
  entryComponents: [
    ConfirmComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ],
  exports: [
    ContentComponent,
    NavBarComponent,
    NavigatorComponent,
    ConfirmComponent,
  ]
})
export class GeneralModule { }
