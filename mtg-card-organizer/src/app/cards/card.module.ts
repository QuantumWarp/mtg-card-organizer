import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { CardDetailsComponent } from './card-details/card-details.component';
import { CardSearchComponent } from './card-search/card-search.component';

import { CardService } from './card-service/card.service';
import { CardsFixture } from './card-service/cards-fixture';

@NgModule({
  declarations: [
    CardDetailsComponent,
    CardSearchComponent
  ],
  imports: [
    SharedModule,
    HttpClientInMemoryWebApiModule.forFeature(CardsFixture, { apiBase: 'api/' }),
  ],
  exports: [
    CardDetailsComponent,
    CardSearchComponent
  ],
  providers: [
    CardService
  ]
})
export class CardModule {}
