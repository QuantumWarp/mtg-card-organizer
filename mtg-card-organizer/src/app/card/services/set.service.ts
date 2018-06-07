import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { PagedData } from '../../shared/filtering/paged-data';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { Cache } from '../../shared/utils/cache';
import { Set } from '../models/set';

@Injectable()
export class SetService implements DataService<Set> {
  private cache = new Cache();

  constructor(private apiService: ApiService) { }

  query(pageSortFilter?: PageSortFilter): Observable<PagedData<Set>> {
    this.cache.cacheMethod(this.query, () => this.apiService.post<PagedData<Set>>('api/sets', pageSortFilter), !pageSortFilter);
    return this.apiService.get<PagedData<Set>>('api/sets', pageSortFilter);
  }
}
