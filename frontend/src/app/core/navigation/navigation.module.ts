import { NgModule } from '@angular/core';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavNodeComponent } from './nav-node/nav-node.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    NavBarComponent,
    NavNodeComponent,
    NavigatorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    NavBarComponent,
    NavigatorComponent,
  ],
})
export class NavigationModule { }
