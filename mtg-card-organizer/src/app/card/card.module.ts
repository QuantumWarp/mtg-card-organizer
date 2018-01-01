import { NgModule } from '@angular/core';
import { SharedModule } from '../general/shared.module';

import { CardDetailsComponent } from './card-details/card-details.component';
import { CardSearchComponent } from './card-search/card-search.component';

import { CardService } from './services/card.service';
import { CardSearchBarComponent } from './card-search/card-search-bar.component';
import { CardSearchGridComponent } from './card-search/card-search-grid.component';
import { CardFilterComponent } from './card-filter/card-filter.component';
import { CardSearchPageComponent } from './card-search-page/card-search-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CardDetailsComponent,
    CardSearchComponent,
    CardSearchBarComponent,
    CardSearchGridComponent,
    CardFilterComponent,
    CardSearchPageComponent,
  ],
  entryComponents: [
    CardFilterComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'search', component: CardSearchPageComponent }
    ]),
  ],
  exports: [
    CardSearchComponent,
    CardDetailsComponent,
  ],
  providers: [
    CardService,
  ]
})
export class CardModule {}
