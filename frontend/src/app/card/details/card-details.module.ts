import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CardDetailsComponent } from './details/card-details.component';
import { CardImageComponent } from './image/card-image.component';
import { CardImagePipe } from './image/card-image.pipe';
import { CardDetailsModalComponent } from './modal/card-details-modal.component';

@NgModule({
  declarations: [
    CardDetailsComponent,
    CardImageComponent,
    CardDetailsModalComponent,
    CardImagePipe,
  ],
  entryComponents: [
    CardDetailsModalComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    CardDetailsModalComponent,
  ],
  providers: [
    CardImagePipe,
  ],
})
export class CardDetailsModule { }
