import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../general/communication/api.service';
import { Cache } from '../../general/communication/cache';
import { DataService } from '../../general/grid/grid-data-source.interfaces';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { PagedData } from '../../general/grid/paged-data';
import { Set } from '../models/set';

@Injectable()
export class SetService implements DataService<Set> {
  private cache = new Cache();

  constructor(private apiService: ApiService) { }

  query(pageSortFilter: PageSortFilter): Observable<PagedData<Set>> {
    this.cache.cacheMethod(this.query, () => this.apiService.post<PagedData<Set>>('api/sets', pageSortFilter), !pageSortFilter);
    return this.apiService.post<PagedData<Set>>('api/sets', pageSortFilter);
  }
}