import { EventEmitter } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { merge } from 'rxjs';

import { PageSortFilter } from '../filtering/page-sort-filter';
import { Paging } from '../filtering/paging';
import { PropertyFilter } from '../filtering/property-filter';
import { PropertySort } from '../filtering/property-sort';
import { CustomDataSource } from '../utils/custom-data-source';
import { DataService } from '../utils/data-service.interface';

export class GridDataSource<T> extends CustomDataSource<T> {

  constructor(
    dataService: DataService<T>,
    private paginator?: MatPaginator,
    private sort?: MatSort) {
    super(dataService);
    this.setupGridUpdates();
    this.setupRefreshTriggers();
  }

  refreshGrid(filters?: Array<PropertyFilter>): void {
    const newPageSortFilter = new PageSortFilter(this.currentQuery);

    if (this.paginator) {
      newPageSortFilter.paging = new Paging({
        limit: this.paginator.pageSize || 10,
        offset:  this.paginator.pageIndex * (this.paginator.pageSize || 10),
      });
    }

    if (this.sort) {
      newPageSortFilter.sort = PropertySort.parseSort(this.sort);
    }

    if (filters) {
      newPageSortFilter.filters = filters;
    }

    this.refresh(newPageSortFilter);
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

    if (this.paginator) {
      reloadEvents.push(this.paginator.page);
    }

    if (this.sort) {
      reloadEvents.push(this.sort.sortChange);
    }

    merge(...reloadEvents).subscribe(() => this.refreshGrid());
  }
}
