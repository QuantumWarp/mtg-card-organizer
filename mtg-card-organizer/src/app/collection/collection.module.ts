import { NgModule } from '@angular/core';
import { SharedModule } from '../general/shared.module';
import { CollectionService } from './services/collection.service';

@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule
  ],
  exports: [  ],
  providers: [
    CollectionService
  ]
})
export class CollectionModule {}
