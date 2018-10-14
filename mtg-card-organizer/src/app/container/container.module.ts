import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserService } from '../bookmark/services/user.service';
import { CollectionService } from '../collection/services/collection.service';
import { DeckService } from '../deck/services/deck.service';
import { SharedModule } from '../shared/shared.module';
import { AddCollectionModalComponent } from './add-modals/add-collection-modal.component';
import { AddContainerModalComponent } from './add-modals/add-container-modal.component';
import { AddDeckModalComponent } from './add-modals/add-deck-modal.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { ContainerExportComponent } from './container-export/container-export.component';
import { ContainerImportComponent } from './container-import/container-import.component';
import { ContainerPageComponent } from './container-page/container-page.component';
import { ContainerPermissionsComponent } from './container-permissions/container-permissions.component';
import { DeckListComponent } from './deck-list/deck-list.component';
import { ContainerPermissionService } from './services/container-permission.service';
import { ContainerResolver } from './services/container.resolver';
import { ContainerService } from './services/container.service';
import { SubContainerListComponent } from './sub-container-list/sub-container-list.component';

@NgModule({
  declarations: [
    ContainerPageComponent,
    SubContainerListComponent,
    CollectionListComponent,
    DeckListComponent,
    AddContainerModalComponent,
    AddCollectionModalComponent,
    AddDeckModalComponent,
    ContainerImportComponent,
    ContainerExportComponent,
    ContainerPermissionsComponent,
  ],
  entryComponents: [
    AddContainerModalComponent,
    AddCollectionModalComponent,
    AddDeckModalComponent,
    ContainerImportComponent,
    ContainerExportComponent,
    ContainerPermissionsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ContainerPageComponent, resolve: { container: ContainerResolver } },
      { path: ':id', component: ContainerPageComponent, resolve: { container: ContainerResolver } },
    ]),
  ],
  exports: [],
  providers: [
    ContainerPermissionService,
    ContainerService,
    ContainerResolver,
    CollectionService,
    UserService,
    DeckService,
  ]
})
export class ContainerModule {}
