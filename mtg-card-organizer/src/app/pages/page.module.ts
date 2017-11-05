import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { CardModule } from '../cards/card.module';

import { CardSearchPageComponent } from './card-search-page/card-search-page.component';

@NgModule({
  declarations: [
    CardSearchPageComponent
  ],
  imports: [
    SharedModule,
    CardModule
  ],
  exports: [
    CardSearchPageComponent
  ]
})
export class PageModule {}