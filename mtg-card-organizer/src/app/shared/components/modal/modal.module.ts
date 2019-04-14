import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material.module';
import { ModalActionsDirective, ModalHeaderDirective } from './modal-parts.directive';
import { ModalComponent } from './modal.component';
import { CardModule } from '../card/card.module';


@NgModule({
  declarations: [
    ModalComponent,
    ModalHeaderDirective,
    ModalActionsDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,

    CardModule,
  ],
  exports: [
    ModalComponent,
    ModalHeaderDirective,
    ModalActionsDirective,
  ]
})
export class ModalModule { }
