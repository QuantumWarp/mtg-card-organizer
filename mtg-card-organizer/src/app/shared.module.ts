import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  exports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
