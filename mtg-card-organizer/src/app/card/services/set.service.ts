import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/internal/operators';

import { ApiService } from '../../core/communication/api.service';
import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { PagedData } from '../../shared/filtering/paged-data';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { Set } from '../models/set';

@Injectable()
export class SetService implements DataService<Set> {
  private cachedSets: Set[];

  constructor(private apiService: ApiService) { }

  query(pageSortFilter?: PageSortFilter): Observable<PagedData<Set>> {
    if (this.cachedSets) {
      return of(this.applyFilter(this.cachedSets, pageSortFilter));
    }

    return this.apiService.get<Set[]>('api/sets').pipe(
      tap(x => this.cachedSets = x),
      map(x => this.applyFilter(x, pageSortFilter)),
    );
  }

  private applyFilter(sets: Set[], pageSortFilter?: PageSortFilter): PagedData<Set> {
    return new PagedData({
      data: sets,
      totalCount: sets.length,
    });
  }
}
