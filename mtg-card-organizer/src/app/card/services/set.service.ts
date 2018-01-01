import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Set } from '../models/set';
import { Observable } from 'rxjs/Observable';
import { QueryData } from '../../general/grid/grid-data-source.interfaces';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { PagedData } from '../../general/grid/paged-data';
import { ApiService } from '../../general/communication/api.service';
import { Cache } from '../../general/communication/cache';

@Injectable()
export class SetService implements QueryData<Set> {
  private cache = new Cache();

  constructor(private apiService: ApiService) { }

  query(pageSortFilter: PageSortFilter): Observable<PagedData<Set>> {
    this.cache.cacheMethod(this.query, () => this.apiService.post<PagedData<Set>>('api/sets', pageSortFilter), !pageSortFilter);
    return this.apiService.post<PagedData<Set>>('api/sets', pageSortFilter);
  }
}
