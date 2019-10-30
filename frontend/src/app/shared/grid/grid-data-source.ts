import { EventEmitter } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { merge } from 'rxjs';

import { Paging } from '../filtering/paging';
import { isPageable, isSortable } from '../utils/apply-data-query.interface';
import { CustomDataSource } from '../utils/custom-data-source';
import { QueryStringGenerator } from '../utils/query-string-generator.interface';
import { DataService } from './grid-data-source.interfaces';

export class GridDataSource<T> extends CustomDataSource<T> {
  constructor(
    dataService: DataService<T>,
    private paginator?: MatPaginator,
    private sort?: MatSort,
  ) {
    super(dataService);
    this.setupGridUpdates();
    this.setupRefreshTriggers();
  }

  refreshGrid(query?: QueryStringGenerator): void {
    query = query ? query : this.currentQuery;

    if (isPageable(query)) {
      query.applyPaging(new Paging({
        limit: this.paginator.pageSize || 10,
        offset:  this.paginator.pageIndex * (this.paginator.pageSize || 10),
      }));
    }

    if (isSortable(query)) {
      query.applySorting(this.sort);
    }

    this.refresh(query);
  }

  private setupGridUpdates(): void {
    this.connectToResult().subscribe(result => {
      if (this.paginator) {
        this.paginator.length = result.totalCount;
      }
    });
  }

  private setupRefreshTriggers(): void {
    const reloadEvents = new Array<EventEmitter<any>>();

    reloadEvents.push(this.dataService.dataChanged);

    if (this.paginator) {
      reloadEvents.push(this.paginator.page);
    }

    if (this.sort) {
      reloadEvents.push(this.sort.sortChange);
    }

    merge(...reloadEvents).subscribe(() => this.refreshGrid());
  }
}
