import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material.module';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ModalModule } from '../modal/modal.module';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,

    ModalModule,
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
  exports: [
    ConfirmDialogComponent,
  ]
})
export class ConfirmDialogModule { }
