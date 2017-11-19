import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { CardDetailsComponent } from './card-details/card-details.component';
import { CardSearchComponent } from './card-search/card-search.component';

import { CardService } from './card-service/card.service';
import { CardSearchBarComponent } from './card-search/card-search-bar.component';
import { CardSearchGridComponent } from './card-search/card-search-grid.component';
import { CardSearchFilterComponent } from './card-search/card-search-filter.component';

@NgModule({
  declarations: [
    CardDetailsComponent,
    CardSearchComponent,
    CardSearchBarComponent,
    CardSearchGridComponent,
    CardSearchFilterComponent
  ],
  entryComponents: [
    CardSearchFilterComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CardSearchComponent,
    CardDetailsComponent
  ],
  providers: [
    CardService
  ]
})
export class CardModule {}
