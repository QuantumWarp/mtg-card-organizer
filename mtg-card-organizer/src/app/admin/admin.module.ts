import { NgModule, } from '@angular/core';
import { SharedModule } from '../general/shared.module';

import { CardModule } from '../card/card.module';

import { ImportCardsComponent } from './import-cards/import-cards.component';
import { RouterModule } from '@angular/router';
import { ImportService } from './services/import.service';

@NgModule({
  declarations: [
    ImportCardsComponent
  ],
  imports: [
    SharedModule,
    CardModule,
    RouterModule.forChild([
      { path: 'import-cards', component: ImportCardsComponent }
    ]),
  ],
  providers: [
    ImportService
  ]
})
export class AdminModule {}
