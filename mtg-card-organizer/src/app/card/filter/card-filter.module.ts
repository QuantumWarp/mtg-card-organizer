import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CardFilterComponent } from './card-filter.component';

@NgModule({
  declarations: [
    CardFilterComponent,
  ],
  imports: [
    SharedModule,
  ],
  entryComponents: [
    CardFilterComponent,
  ],
  exports: [
    CardFilterComponent,
  ],
})
export class CardFilterModule {}
