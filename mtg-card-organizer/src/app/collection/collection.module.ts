import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from '../card/card.module';
import { SharedModule } from '../shared/shared.module';
import { CardInstanceGridComponent } from './card-instance-grid/card-instance-grid.component';
import { CardRapidEntryResultComponent } from './card-rapid-entry/card-rapid-entry-result/card-rapid-entry-result.component';
import { CardRapidEntryComponent } from './card-rapid-entry/card-rapid-entry/card-rapid-entry.component';
import { CollectionPageComponent } from './collection-page/collection-page.component';
import { CollectionResolver } from './services/collection.resolver';

@NgModule({
  declarations: [
    CardRapidEntryComponent,
    CardRapidEntryResultComponent,

    CardInstanceGridComponent,
    CollectionPageComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: ':id', component: CollectionPageComponent, resolve: { collection: CollectionResolver } },
    ]),
    CardModule,
  ],
  providers: [
    CollectionResolver,
  ]
})
export class CollectionModule { }
