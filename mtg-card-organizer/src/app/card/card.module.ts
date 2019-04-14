import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { CardDetailsModule } from './details/card-details.module';
import { CardFilterModule } from './filter/card-filter.module';
import { CardGridModule } from './grids/card-grids.module';
import { CardSearchModule } from './search/card-search.module';
import { CardSearchPageComponent } from './search/page/card-search-page.component';
import { SymbolsModule } from './symbols/symbols.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'search', component: CardSearchPageComponent }
    ]),

    CardDetailsModule,
    CardFilterModule,
    CardGridModule,
    CardSearchModule,
    SymbolsModule,
  ],
  exports: [
    CardDetailsModule,
    CardFilterModule,
    CardGridModule,
    CardSearchModule,
    SymbolsModule,
  ],
})
export class CardModule {}
