import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from '../card/card.module';
import { SharedModule } from '../general/shared.module';
import { CollectionResolver } from './services/collection.resolver';
import { CollectionService } from './services/collection.service';
import { CollectionViewComponent } from './collection-view/collection-view.component';
import { CardRapidEntryComponent } from '../card/card-rapid-entry/card-rapid-entry.component';
import { CollectionExportComponent } from './collection-export/collection-export.component';
import { CollectionImportComponent } from './collection-import/collection-import.component';
import { CreateCollectionComponent } from './collection-view/create-collection.component';

@NgModule({
  declarations: [
    CollectionViewComponent,
    CollectionExportComponent,
    CollectionImportComponent,
    CreateCollectionComponent,
  ],
  entryComponents: [
    CardRapidEntryComponent,
    CollectionExportComponent,
    CollectionImportComponent,
    CreateCollectionComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: CollectionViewComponent },
      { path: ':id', component: CollectionViewComponent, resolve: { collection: CollectionResolver } },
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
