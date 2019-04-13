import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { GravatarIconComponent } from './gravatar-icon/gravatar-icon.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { TitleAndTrailComponent } from './page-header/title-and-trail.component';
import { CardModule } from './card/card.module';

@NgModule({
  declarations: [
    GravatarIconComponent,
    ConfirmDialogComponent,
    PageHeaderComponent,
    TitleAndTrailComponent,
    DefaultPageComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
  imports: [
    MaterialModule,
  ],
  exports: [
    CardModule,
    GravatarIconComponent,
    ConfirmDialogComponent,
    DefaultPageComponent,
  ]
})
export class ComponentModule { }
