import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutofocusDirective } from './directives/autofocus.directive';
import { MaterialModule } from './material.module';
import { GravatarIconComponent } from './services/gravatar-icon.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { TitleAndTrailComponent } from './page-header/title-and-trail.component';

@NgModule({
  declarations: [
    AutofocusDirective,
    GravatarIconComponent,
    PageHeaderComponent,
    TitleAndTrailComponent,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AutofocusDirective,
    GravatarIconComponent,
    PageHeaderComponent,
    TitleAndTrailComponent,
  ]
})
export class SharedModule { }
