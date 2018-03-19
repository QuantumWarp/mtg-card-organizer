import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { AutofocusDirective } from './directives/autofocus.directive';
import { MaterialModule } from './material.module';
import { GravatarIconComponent } from './services/gravatar-icon.component';

@NgModule({
  declarations: [
    AutofocusDirective,
    GravatarIconComponent,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    AutofocusDirective,
    GravatarIconComponent,
  ]
})
export class SharedModule { }
