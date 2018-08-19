import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardFilterComponent } from './card-filter/card-filter.component';
import { CardRapidEntryComponent } from './card-rapid-entry/card-rapid-entry/card-rapid-entry.component';
import { CardSearchPageComponent } from './card-search-page/card-search-page.component';
import { CardSetService } from './services/card.service';
import { SetService } from './services/set.service';
import { SetSymbolComponent } from './set-symbol/set-symbol.component';
import { SingleManaSymbolComponent } from './mana-symbol/single-mana-symbol.component';
import { ManaCostComponent } from './mana-symbol/mana-cost.component';
import { CardDetailsModalComponent } from './card-details/card-details-modal.component';
import { CardImagePipe } from './card-image/card-image.pipe';
import { CardImageComponent } from './card-image/card-image.component';
import { CardInstanceGridComponent } from './card-instance-grid/card-instance-grid.component';
import { CardSearchBarComponent } from './card-search-bar/card-search-bar.component';
import { CardRapidEntryResultComponent } from './card-rapid-entry/card-rapid-entry-result/card-rapid-entry-result.component';

@NgModule({
  declarations: [
    CardDetailsComponent,
    CardInstanceGridComponent,
    CardSearchBarComponent,
    CardFilterComponent,
    CardSearchPageComponent,
    CardRapidEntryComponent,
    SetSymbolComponent,
    ManaCostComponent,
    SingleManaSymbolComponent,
    CardDetailsModalComponent,
    CardImageComponent,
    CardImagePipe,
    CardRapidEntryResultComponent,
  ],
  entryComponents: [
    CardFilterComponent,
    CardDetailsModalComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'search', component: CardSearchPageComponent }
    ]),
  ],
  exports: [
    CardInstanceGridComponent,
    CardDetailsComponent,
    CardRapidEntryComponent,
    CardDetailsModalComponent,
    CardFilterComponent,
  ],
  providers: [
    CardSetService,
    SetService,
    CardImagePipe,
  ]
})
export class CardModule {}
