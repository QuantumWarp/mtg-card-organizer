import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { GridModule } from './grid/grid.module';
import { MaterialModule } from './material.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  exports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    ComponentsModule,
    DirectivesModule,
    GridModule,
    PipesModule,
  ]
})
export class SharedModule { }
