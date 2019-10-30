import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ContainerPermissionsComponent } from './container-permissions.component';

@NgModule({
  declarations: [
    ContainerPermissionsComponent,
  ],
  entryComponents: [
    ContainerPermissionsComponent,
  ],
  exports: [
    ContainerPermissionsComponent,
  ],
  imports: [
    SharedModule,
  ],
})
export class ContainerPermissionsModule {}
