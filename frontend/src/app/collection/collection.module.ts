import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from '../card/card.module';
import { SharedModule } from '../shared/shared.module';
import { CardRapidEntryModule } from './card-rapid-entry/card-rapid-entry.module';
import { CollectionGridModule } from './grids/collection-grids.module';
import { CollectionPageComponent } from './page/collection-page.component';
import { CollectionResolver } from './services/collection.resolver';

@NgModule({
  declarations: [
    CollectionPageComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: ':id', component: CollectionPageComponent, resolve: { collection: CollectionResolver } },
    ]),

    CardModule,
    CollectionGridModule,
    CardRapidEntryModule,
  ],
  providers: [
    CollectionResolver,
  ]
})
export class CollectionModule { }
