import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
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
  ]
})
export class ContainerModule {}
