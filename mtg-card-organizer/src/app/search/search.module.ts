import { NgModule, } from '@angular/core';
import { SharedModule } from '../shared.module';

import { CardModule } from '../cards/card.module';

import { CardSearchPageComponent } from './card-search-page/card-search-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CardSearchPageComponent
  ],
  entryComponents: [
    CardSearchPageComponent
  ],
  imports: [
    SharedModule,
    CardModule,
    RouterModule.forChild([
      { path: 'card-search', component: CardSearchPageComponent }
    ]),
  ]
})
export class SearchModule {}
