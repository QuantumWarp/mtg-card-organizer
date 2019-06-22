import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from '../card/card.module';
import { SharedModule } from '../shared/shared.module';
import { DeckCardSearchComponent } from './card-search/deck-card-search.component';
import { MainGridComponent } from './main-grid/main-grid.component';
import { DeckPageComponent } from './page/deck-page.component';
import { DeckResolver } from './services/deck.resolver';
import { SideboardGridComponent } from './sideboard-grid/sideboard-grid.component';
import { CollectionGridModule } from '../collection/grids/collection-grids.module';

@NgModule({
  declarations: [
    DeckPageComponent,
    MainGridComponent,
    SideboardGridComponent,
    DeckCardSearchComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: ':id', component: DeckPageComponent, resolve: { deck: DeckResolver } },
    ]),
    CardModule,
    CollectionGridModule,
  ],
  exports: [],
  providers: [
    DeckResolver,
  ]
})
export class DeckModule { }
