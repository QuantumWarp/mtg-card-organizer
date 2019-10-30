import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material.module';
import { GravatarIconComponent } from './gravatar-icon.component';

@NgModule({
  declarations: [
    GravatarIconComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    GravatarIconComponent,
  ]
})
export class GravatarIconModule { }
