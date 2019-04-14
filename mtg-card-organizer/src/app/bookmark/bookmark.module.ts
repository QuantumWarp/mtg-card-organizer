import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { BookmarkedContainerListComponent } from './container-list/bookmarked-container-list.component';
import { BookmarkPageComponent } from './page/bookmark-page.component';
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
