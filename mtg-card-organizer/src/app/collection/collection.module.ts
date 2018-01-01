import { NgModule } from '@angular/core';
import { SharedModule } from '../general/shared.module';
import { CollectionService } from './services/collection.service';
import { RouterModule } from '@angular/router';
import { CollectionViewerComponent } from './collection-viewer/collection-viewer.component';
import { CollectionEditorComponent } from './collection-editor/collection-editor.component';

@NgModule({
  declarations: [
    CollectionViewerComponent,
    CollectionEditorComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'viewer', component: CollectionViewerComponent }
    ]),
  ],
  exports: [],
  providers: [
    CollectionService,
  ]
})
export class CollectionModule {}
