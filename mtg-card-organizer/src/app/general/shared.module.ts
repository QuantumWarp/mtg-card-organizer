import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { ApiService } from './communication/api.service';
import { AutofocusDirective } from './directives/autofocus.directive';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AutofocusDirective,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    AutofocusDirective,
  ],
  providers: [
    ApiService
  ],
})
export class SharedModule { }
