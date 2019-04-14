import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';

import { Container } from '../../container/models/container';
import { ContainerService } from '../../container/services/container.service';
import { Paging } from '../../shared/filtering/paging';
import { UserSearchComponent } from '../user-search/user-search.component';

@Component({
  selector: 'mco-bookmark-page',
  templateUrl: './bookmark-page.component.html',
  styleUrls: ['./bookmark-page.component.scss']
})
export class BookmarkPageComponent implements OnInit {
  bookmarkedContainers: Container[] = [];

  constructor(
    private containerService: ContainerService,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.containerService.bookmarks(new Paging()).subscribe(result => {
      this.bookmarkedContainers = result.data;
    });
  }
}
