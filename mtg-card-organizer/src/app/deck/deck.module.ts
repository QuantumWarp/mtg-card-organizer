import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from '../card/card.module';
import { SharedModule } from '../shared/shared.module';
import { DeckPageComponent } from './deck-page/deck-page.component';
import { DeckResolver } from './services/deck.resolver';
import { DeckService } from './services/deck.service';
import { MainGridComponent } from './main-grid/main-grid.component';
import { SideboardGridComponent } from './sideboard-grid/sideboard-grid.component';

@NgModule({
  declarations: [
    DeckPageComponent,
    MainGridComponent,
    SideboardGridComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: ':id', component: DeckPageComponent, resolve: { deck: DeckResolver } },
    ]),
    CardModule,
  ],
  exports: [],
  providers: [
    DeckService,
    DeckResolver,
  ]
})
export class DeckModule { }
