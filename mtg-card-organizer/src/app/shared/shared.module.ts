import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentModule } from './components/component.module';
import { AutofocusDirective } from './directives/autofocus.directive';
import { GridModule } from './grid/grid.module';
import { MaterialModule } from './material.module';
import { PageHeaderComponent } from './page-header/page-header.component';
import { TitleAndTrailComponent } from './page-header/title-and-trail.component';
import { KeysPipe } from './pipes/keys.pipe';

@NgModule({
  declarations: [
    AutofocusDirective,
    PageHeaderComponent,
    TitleAndTrailComponent,
    KeysPipe,
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

    KeysPipe,
  ]
})
export class SharedModule { }
