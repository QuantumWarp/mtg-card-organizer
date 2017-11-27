import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventEmitter } from '@angular/core';
import { PageSortFilter } from './page-sort-filter';
import { PropertySort } from './property-sort';
import { GetAllData } from './grid-data-source.interfaces';
import { Filterer } from './filterer';

export class GridDataSource<T> extends DataSource<T> {
  private currentData: T[] = [];
  private subject: BehaviorSubject<T[]>;
  private localDataChange = new EventEmitter();
  private currentPageSortFilter = new PageSortFilter();

  constructor(
    protected service: GetAllData<T>,
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

    this.service.getAll(this.currentPageSortFilter).subscribe(result => {
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
