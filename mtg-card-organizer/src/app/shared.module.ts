import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  exports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
