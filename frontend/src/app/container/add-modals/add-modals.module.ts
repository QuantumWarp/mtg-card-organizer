import { NgModule } from '@angular/core';

import { AddCollectionModalComponent } from './collection/add-collection-modal.component';
import { AddContainerModalComponent } from './container/add-container-modal.component';
import { AddDeckModalComponent } from './deck/add-deck-modal.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AddContainerModalComponent,
    AddCollectionModalComponent,
    AddDeckModalComponent,
  ],
  entryComponents: [
    AddContainerModalComponent,
    AddCollectionModalComponent,
    AddDeckModalComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    AddContainerModalComponent,
    AddCollectionModalComponent,
    AddDeckModalComponent,
  ],
})
export class AddModalsModule {}
