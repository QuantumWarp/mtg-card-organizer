import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { CardDetailsModalComponent } from './card-details/card-details-modal.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardFilterComponent } from './card-filter/card-filter.component';
import { CardImageComponent } from './card-image/card-image.component';
import { CardImagePipe } from './card-image/card-image.pipe';
import { CardSearchBarComponent } from './card-search-bar/card-search-bar.component';
import { CardSearchPageComponent } from './card-search-page/card-search-page.component';
import { CardSetGridComponent } from './card-set-grid/card-set-grid.component';
import { ManaCostComponent } from './mana-symbol/mana-cost.component';
import { SingleManaSymbolComponent } from './mana-symbol/single-mana-symbol.component';
import { CardSetService } from './services/card-set.service';
import { CardService } from './services/card.service';
import { SetService } from './services/set.service';
import { SetSymbolComponent } from './set-symbol/set-symbol.component';
import { CardGridComponent } from './card-grid/card-grid.component';
import { CollectionService } from '../collection/services/collection.service';

@NgModule({
  declarations: [
    SingleManaSymbolComponent,
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
    SingleManaSymbolComponent,
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
