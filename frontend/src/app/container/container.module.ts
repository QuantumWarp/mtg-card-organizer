import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AddModalsModule } from './add-modals/add-modals.module';
import { ImportExportModule } from './import-export/import-export.module';
import { ListsModule } from './lists/lists.module';
import { ContainerPageComponent } from './page/container-page.component';
import { ContainerPermissionsModule } from './permissions/container-permissions.module';
import { ContainerResolver } from './services/container.resolver';

@NgModule({
  declarations: [
    ContainerPageComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ContainerPageComponent, resolve: { container: ContainerResolver } },
      { path: ':id', component: ContainerPageComponent, resolve: { container: ContainerResolver } },
    ]),

    AddModalsModule,
    ImportExportModule,
    ListsModule,
    ContainerPermissionsModule,
  ],
  providers: [
    ContainerResolver,
  ]
})
export class ContainerModule {}
