import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { CardDetailsComponent } from './card-details/card-details.component';
import { CardSearchComponent } from './card-search/card-search.component';

import { CardService } from './card-service/card.service';

@NgModule({
  declarations: [
    CardDetailsComponent,
    CardSearchComponent
  ],
  imports: [
    SharedModule
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