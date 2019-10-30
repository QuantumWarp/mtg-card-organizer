import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ContainerExportComponent } from './export/container-export.component';
import { ContainerImportComponent } from './import/container-import.component';

@NgModule({
  declarations: [
    ContainerExportComponent,
    ContainerImportComponent,
  ],
  entryComponents: [
    ContainerExportComponent,
    ContainerImportComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    ContainerExportComponent,
    ContainerImportComponent,
  ],
})
export class ImportExportModule {}
