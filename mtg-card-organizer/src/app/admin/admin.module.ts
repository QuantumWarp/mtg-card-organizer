import { NgModule, } from '@angular/core';
import { SharedModule } from '../shared.module';

import { CardModule } from '../cards/card.module';

import { ImportCardsComponent } from './import-cards/import-cards.component';
import { RouterModule } from '@angular/router';
import { ImportService } from './services/import.service';

@NgModule({
  declarations: [
    ImportCardsComponent
  ],
  entryComponents: [
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
