import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material.module';
import { CardActionsDirective, CardHeaderDirective } from './card-parts.directive';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CardComponent,
    CardHeaderDirective,
    CardActionsDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    CardComponent,
    CardHeaderDirective,
    CardActionsDirective,
  ]
})
export class CardModule { }
