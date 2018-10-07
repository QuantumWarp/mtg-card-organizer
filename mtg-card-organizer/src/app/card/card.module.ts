import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CollectionService } from '../collection/services/collection.service';
import { SharedModule } from '../shared/shared.module';
import { CardDetailsModalComponent } from './card-details/card-details-modal.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardFilterComponent } from './card-filter/card-filter.component';
import { CardGridComponent } from './card-grid/card-grid.component';
import { CardImageComponent } from './card-image/card-image.component';
import { CardImagePipe } from './card-image/card-image.pipe';
import { CardSearchBarComponent } from './card-search-bar/card-search-bar.component';
import { CardSearchPageComponent } from './card-search-page/card-search-page.component';
import { CardSetGridComponent } from './card-set-grid/card-set-grid.component';
import { CustomManaSymbolComponent } from './mana-symbol/custom-mana-symbol/custom-mana-symbol.component';
import { ManaCostComponent } from './mana-symbol/mana-cost/mana-cost.component';
import { RealManaSymbolComponent } from './mana-symbol/real-mana-symbol/real-mana-symbol.component';
import { CardSetService } from './services/card-set.service';
import { CardService } from './services/card.service';
import { SetService } from './services/set.service';
import { SetSymbolComponent } from './set-symbol/set-symbol.component';

@NgModule({
  declarations: [
    RealManaSymbolComponent,
    CustomManaSymbolComponent,
    SetSymbolComponent,
    CardImageComponent,
    CardImagePipe,
    ManaCostComponent,

    CardDetailsComponent,
    CardDetailsModalComponent,

    CardFilterComponent,
    CardSearchBarComponent,
    CardSearchPageComponent,

    CardGridComponent,
    CardSetGridComponent,
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
    SetSymbolComponent,
    CardImageComponent,
    CardImagePipe,
    ManaCostComponent,

    CardDetailsComponent,
    CardDetailsModalComponent,

    CardFilterComponent,

    CardGridComponent,
    CardSetGridComponent,
  ],
  providers: [
    CardSetService,
    CardService,
    SetService,
    CardImagePipe,
    CollectionService,
  ]
})
export class CardModule {}
