import { NgModule } from '@angular/core';

import { CardModule } from './card/card.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { DefaultPageModule } from './default-page/default-page.module';
import { GravatarIconModule } from './gravatar-icon/gravatar-icon.module';
import { ItemListModule } from './item-list/item-list.module';
import { ModalModule } from './modal/modal.module';

@NgModule({
  entryComponents: [
    ConfirmDialogComponent,
  ],
  exports: [
    CardModule,
    ConfirmDialogModule,
    DefaultPageModule,
    GravatarIconModule,
    ItemListModule,
    ModalModule,
  ],
})
export class ComponentsModule { }
