import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material.module';
import { CardModule } from '../card/card.module';
import { ItemListComponent } from './item-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ItemListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,

    CardModule,
  ],
  exports: [
    ItemListComponent,
  ]
})
export class ItemListModule { }
