import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CardSearchBarComponent } from './bar/card-search-bar.component';
import { CardSearchPageComponent } from './page/card-search-page.component';

@NgModule({
  declarations: [
    CardSearchBarComponent,
    CardSearchPageComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    CardSearchBarComponent,
    CardSearchPageComponent,
  ],
})
export class CardSearchModule {}
