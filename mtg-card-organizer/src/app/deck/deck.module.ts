import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from '../card/card.module';
import { SharedModule } from '../shared/shared.module';
import { DeckPageComponent } from './deck-page/deck-page.component';
import { DeckResolver } from './services/deck.resolver';
import { DeckService } from './services/deck.service';

@NgModule({
  declarations: [
    DeckPageComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: ':id', component: DeckPageComponent, resolve: { collection: DeckResolver } },
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
