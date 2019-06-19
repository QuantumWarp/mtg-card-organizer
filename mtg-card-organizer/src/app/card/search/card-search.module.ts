import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CardFilterModule } from '../filter/card-filter.module';
import { CardGridModule } from '../grids/card-grids.module';
import { SymbolsModule } from '../symbols/symbols.module';
import { CardSearchBarComponent } from './bar/card-search-bar.component';
import { CardSearchPageComponent } from './page/card-search-page.component';
import { CollectionGridModule } from '../../collection/grids/collection-grids.module';

@NgModule({
  declarations: [
    CardSearchBarComponent,
    CardSearchPageComponent,
  ],
  imports: [
    SharedModule,

    CollectionGridModule,
    CardGridModule,
    CardFilterModule,
    SymbolsModule,
  ],
  exports: [
    CardSearchBarComponent,
    CardSearchPageComponent,
  ],
})
export class CardSearchModule {}
