import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentModule } from '../components/component.module';
import { MaterialModule } from '../material.module';
import { BasicGridComponent } from './basic-grid/basic-grid.component';
import { InnerGridMessageComponent } from './basic-grid/inner-grid-message/inner-grid-message.component';
import { LoadingMessageComponent } from './basic-grid/inner-grid-message/loading-message.component';
import { NoResultsMessageComponent } from './basic-grid/inner-grid-message/no-results-message.component';

@NgModule({
  declarations: [
    BasicGridComponent,

    InnerGridMessageComponent,
    LoadingMessageComponent,
    NoResultsMessageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentModule,
  ],
  exports: [
    BasicGridComponent,
  ]
})
export class GridModule { }
