import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CollectionService } from '../collection/services/collection.service';
import { DeckService } from '../deck/services/deck.service';
import { SharedModule } from '../shared/shared.module';
import { AddCollectionModalComponent } from './add-modals/add-collection-modal.component';
import { AddContainerModalComponent } from './add-modals/add-container-modal.component';
import { AddDeckModalComponent } from './add-modals/add-deck-modal.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { ContainerViewComponent } from './container-view/container-view.component';
import { DeckListComponent } from './deck-list/deck-list.component';
import { ContainerResolver } from './services/container.resolver';
import { ContainerService } from './services/container.service';
import { SubContainerListComponent } from './sub-container-list/sub-container-list.component';

@NgModule({
  declarations: [
    ContainerViewComponent,
    SubContainerListComponent,
    CollectionListComponent,
    DeckListComponent,
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
    RouterModule.forChild([
      { path: '', component: ContainerViewComponent, resolve: { container: ContainerResolver } },
      { path: ':id', component: ContainerViewComponent, resolve: { container: ContainerResolver } },
    ]),
  ],
  exports: [],
  providers: [
    ContainerService,
    ContainerResolver,
    CollectionService,
    DeckService,
  ]
})
export class ContainerModule {}
