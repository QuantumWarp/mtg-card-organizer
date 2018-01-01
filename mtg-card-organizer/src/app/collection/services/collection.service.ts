import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection } from '../models/collection';
import { Observable } from 'rxjs/Observable';
import { GetAllData } from '../../general/grid/grid-data-source.interfaces';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { PagedData } from '../../general/grid/paged-data';
import { ApiService } from '../../general/communication/api.service';

@Injectable()
export class CollectionService implements GetAllData<Collection> {

  constructor(private apiService: ApiService) { }

  getAll(pageSortFilter: PageSortFilter): Observable<PagedData<Collection>> {
    return this.apiService.post<PagedData<Collection>>('api/card/all', pageSortFilter);
  }
}

