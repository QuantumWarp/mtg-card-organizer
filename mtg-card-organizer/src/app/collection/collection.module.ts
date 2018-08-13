import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardRapidEntryComponent } from '../card/card-rapid-entry/card-rapid-entry.component';
import { CardModule } from '../card/card.module';
import { SharedModule } from '../shared/shared.module';
import { CollectionExportComponent } from './collection-export/collection-export.component';
import { CollectionImportComponent } from './collection-import/collection-import.component';
import { CollectionCardsComponent } from './collection-view/collection-cards.component';
import { CollectionViewComponent } from './collection-view/collection-view.component';
import { CollectionResolver } from './services/collection.resolver';
import { CollectionService } from './services/collection.service';

@NgModule({
  declarations: [
    CollectionViewComponent,
    CollectionExportComponent,
    CollectionImportComponent,
    CollectionCardsComponent,
  ],
  entryComponents: [
    CardRapidEntryComponent,
    CollectionExportComponent,
    CollectionImportComponent,
    CollectionCardsComponent,
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
