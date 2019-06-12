import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from '../card/card.module';
import { SharedModule } from '../shared/shared.module';
import { CardInstanceGridComponent } from './card-instance-grid/card-instance-grid.component';
import { CardRapidEntryModule } from './card-rapid-entry/card-rapid-entry.module';
import { CollectionPageComponent } from './page/collection-page.component';
import { CollectionResolver } from './services/collection.resolver';
import { CardInstanceGroupedCardGridComponent } from './card-instance-grouped-card-grid/card-instance-grouped-card-grid.component';
import { CardInstanceGroupedCardSetGridComponent } from './card-instance-grouped-card-set-grid/card-instance-grouped-card-set-grid.component';

@NgModule({
  declarations: [
    CardInstanceGroupedCardGridComponent,
    CardInstanceGroupedCardSetGridComponent,
    CardInstanceGridComponent,
    CollectionPageComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: ':id', component: CollectionPageComponent, resolve: { collection: CollectionResolver } },
    ]),

    CardModule,
    CardRapidEntryModule,
  ],
  providers: [
    CollectionResolver,
  ]
})
export class CollectionModule { }
