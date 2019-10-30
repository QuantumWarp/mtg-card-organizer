import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { SymbolsModule } from '../symbols/symbols.module';
import { CardSetGridComponent } from './card-set/card-set-grid.component';
import { CardGridComponent } from './card/card-grid.component';

@NgModule({
  declarations: [
    CardGridComponent,
    CardSetGridComponent,
  ],
  imports: [
    SharedModule,

    SymbolsModule,
  ],
  exports: [
    CardGridComponent,
    CardSetGridComponent,
  ],
})
export class CardGridModule {}
