import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from '../card/card.module';
import { SharedModule } from '../shared/shared.module';
import { ImportCardsComponent } from './import-cards/import-cards.component';
import { AdminUserGridComponent } from './users/admin-user-grid/admin-user-grid.component';
import { AdminUserPageComponent } from './users/admin-user-page/admin-user-page.component';

@NgModule({
  declarations: [
    ImportCardsComponent,
    AdminUserPageComponent,
    AdminUserGridComponent,
  ],
  imports: [
    SharedModule,
    CardModule,
    RouterModule.forChild([
      { path: 'import-cards', component: ImportCardsComponent },
      { path: 'users', component: AdminUserPageComponent },
    ]),
  ],
})
export class AdminModule {}
