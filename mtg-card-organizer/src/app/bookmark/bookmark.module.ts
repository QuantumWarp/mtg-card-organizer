import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CollectionService } from '../collection/services/collection.service';
import { ContainerService } from '../container/services/container.service';
import { SharedModule } from '../shared/shared.module';
import { BookmarkPageComponent } from './bookmark-page/bookmark-page.component';
import { BookmarkedContainerListComponent } from './bookmarked-container-list/bookmarked-container-list.component';
import { UserService } from './services/user.service';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
  declarations: [
    BookmarkPageComponent,
    BookmarkedContainerListComponent,
    UserSearchComponent,
  ],
  entryComponents: [
    UserSearchComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: BookmarkPageComponent },
    ]),
  ],
})
export class BookmarkModule {}
