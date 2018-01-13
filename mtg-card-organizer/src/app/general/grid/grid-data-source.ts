import { DataSource } from '@angular/cdk/collections';
import { EventEmitter } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Filterer } from './filterer';
import { DataService } from './grid-data-source.interfaces';
import { PageSortFilter } from './page-sort-filter';
import { PropertySort } from './property-sort';

export class GridDataSource<T> extends DataSource<T> {
  private currentData: T[] = [];
  private subject: BehaviorSubject<T[]>;
  private localDataChange = new EventEmitter();
  private currentPageSortFilter = new PageSortFilter();

  constructor(
    protected dataService: DataService<T>,
    protected paginator: MatPaginator,
    protected sort: MatSort,
    protected filterer: Filterer) {
    super();
    this.subject = new BehaviorSubject<T[]>(this.currentData);
    this.localDataChange.subscribe(() => this.subject.next(this.currentData));

    const reloadEvents = [ this.paginator.page, this.sort.sortChange, this.filterer.filterChange ];
    reloadEvents.forEach(ee => ee.subscribe(() => this.reloadData()));

    this.reloadData();
  }

  reloadData(): void {
    this.currentPageSortFilter.sort = PropertySort.parseSort(this.sort);
    this.currentPageSortFilter.page = this.paginator.pageIndex;
    this.currentPageSortFilter.pageSize = this.paginator.pageSize || 10;
    this.currentPageSortFilter.filter = this.filterer.filter;

    this.dataService.query(this.currentPageSortFilter).subscribe(result => {
      this.currentData = result.data;
      this.paginator.length = result.totalCount;
      this.localDataChange.emit();
    });
  }

  connect(): Observable<T[]> {
    return this.subject;
  }

  disconnect(): void {
  }
}
