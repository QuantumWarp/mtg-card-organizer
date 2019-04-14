import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CardRapidEntryResultComponent } from './card-rapid-entry-result/card-rapid-entry-result.component';
import { CardRapidEntryComponent } from './card-rapid-entry/card-rapid-entry.component';

@NgModule({
  declarations: [
    CardRapidEntryComponent,
    CardRapidEntryResultComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    CardRapidEntryComponent,
    CardRapidEntryResultComponent,
  ],
})
export class CardRapidEntryModule { }
