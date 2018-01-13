import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from '../card/card.module';
import { SharedModule } from '../general/shared.module';
import { CollectionViewerComponent } from './collection-viewer/collection-viewer.component';
import { CollectionResolver } from './services/collection.resolver';
import { CollectionService } from './services/collection.service';
import { SingleCollectionViewComponent } from './single-collection-view/single-collection-view.component';
import { CardRapidEntryComponent } from '../card/card-rapid-entry/card-rapid-entry.component';

@NgModule({
  declarations: [
    CollectionViewerComponent,
    SingleCollectionViewComponent,
  ],
  entryComponents: [
    CardRapidEntryComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: CollectionViewerComponent },
      { path: ':id', component: SingleCollectionViewComponent, resolve: { collection: CollectionResolver } },
    ]),
    CardModule,
  ],
  exports: [],
  providers: [
    CollectionService,
    CollectionResolver,
  ]
})
export class CollectionModule {}
