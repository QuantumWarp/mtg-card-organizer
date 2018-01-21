import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../general/shared.module';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardFilterComponent } from './card-filter/card-filter.component';
import { CardRapidEntryComponent } from './card-rapid-entry/card-rapid-entry.component';
import { RapidEntryResultGridComponent } from './card-rapid-entry/rapid-entry-result-grid.component';
import { CardSearchPageComponent } from './card-search-page/card-search-page.component';
import { CardSearchBarComponent } from './card-search/card-search-bar.component';
import { CardSearchGridComponent } from './card-search/card-search-grid.component';
import { CardSearchComponent } from './card-search/card-search.component';
import { CardService } from './services/card.service';
import { RapidEntrySingleViewComponent } from './card-rapid-entry/rapid-entry-single-view.component';
import { SetService } from './services/set.service';

@NgModule({
  declarations: [
    CardDetailsComponent,
    CardSearchComponent,
    CardSearchBarComponent,
    CardSearchGridComponent,
    CardFilterComponent,
    CardSearchPageComponent,
    CardRapidEntryComponent,
    RapidEntryResultGridComponent,
    RapidEntrySingleViewComponent,
  ],
  entryComponents: [
    CardFilterComponent,
    RapidEntrySingleViewComponent,
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
    CardRapidEntryComponent,
  ],
  providers: [
    CardService,
    SetService,
  ]
})
export class CardModule {}
