import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  exports: [
    BrowserModule,
    MaterialModule,
    FormsModule
    // FlexLayoutModule
  ]
})
export class SharedModule { }
