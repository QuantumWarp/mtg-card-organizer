import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { DeckListComponent } from './deck-list/deck-list.component';
import { SubContainerListComponent } from './sub-container-list/sub-container-list.component';

@NgModule({
  declarations: [
    CollectionListComponent,
    DeckListComponent,
    SubContainerListComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    CollectionListComponent,
    DeckListComponent,
    SubContainerListComponent,
  ],
})
export class ListsModule {}
