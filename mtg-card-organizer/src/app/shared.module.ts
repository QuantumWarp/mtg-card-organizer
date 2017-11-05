import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  exports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
