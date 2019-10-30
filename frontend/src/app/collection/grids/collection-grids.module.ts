import { NgModule } from '@angular/core';

import { CardInstanceGridComponent } from './card-instance-grid/card-instance-grid.component';
import { CardInstanceGroupedCardGridComponent } from './card-instance-grouped-card-grid/card-instance-grouped-card-grid.component';
import { CardInstanceGroupedCardSetGridComponent } from './card-instance-grouped-card-set-grid/card-instance-grouped-card-set-grid.component';
import { SharedModule } from '../../shared/shared.module';
import { VariableGridComponent } from './variable-grid/variable-grid.component';
import { CardModule } from '../../card/card.module';
import { CardGridModule } from '../../card/grids/card-grids.module';
import { SymbolsModule } from '../../card/symbols/symbols.module';

@NgModule({
  declarations: [
    CardInstanceGroupedCardGridComponent,
    CardInstanceGroupedCardSetGridComponent,
    CardInstanceGridComponent,
    VariableGridComponent,
  ],
  imports: [
    SharedModule,

    CardGridModule,
    SymbolsModule,
  ],
  exports: [
    CardInstanceGroupedCardGridComponent,
    CardInstanceGroupedCardSetGridComponent,
    CardInstanceGridComponent,
    VariableGridComponent,
  ]
})
export class CollectionGridModule { }
