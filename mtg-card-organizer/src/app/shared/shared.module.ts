import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentModule } from './components/component.module';
import { AutofocusDirective } from './directives/autofocus.directive';
import { MaterialModule } from './material.module';
import { PageHeaderComponent } from './page-header/page-header.component';
import { TitleAndTrailComponent } from './page-header/title-and-trail.component';
import { GridModule } from './grid/grid.module';

@NgModule({
  declarations: [
    AutofocusDirective,
    PageHeaderComponent,
    TitleAndTrailComponent,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ComponentModule,
    GridModule,

    AutofocusDirective,

    PageHeaderComponent,
    TitleAndTrailComponent,
  ]
})
export class SharedModule { }
