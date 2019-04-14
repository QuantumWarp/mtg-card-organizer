import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from '../card/card.module';
import { SharedModule } from '../shared/shared.module';
import { CardInstanceGridComponent } from './card-instance-grid/card-instance-grid.component';
import { CardRapidEntryModule } from './card-rapid-entry/card-rapid-entry.module';
import { CollectionPageComponent } from './page/collection-page.component';
import { CollectionResolver } from './services/collection.resolver';

@NgModule({
  declarations: [
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
