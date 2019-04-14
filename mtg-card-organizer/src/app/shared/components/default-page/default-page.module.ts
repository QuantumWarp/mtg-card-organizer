import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material.module';
import { DefaultPageComponent } from './default-page.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { TitleAndTrailComponent } from './title-and-trail/title-and-trail.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    DefaultPageComponent,
    TitleAndTrailComponent,
    PageHeaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    DefaultPageComponent,
  ]
})
export class DefaultPageModule { }
