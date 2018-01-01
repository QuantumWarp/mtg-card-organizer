import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card';
import { Observable } from 'rxjs/Observable';
import { QueryData } from '../../general/grid/grid-data-source.interfaces';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { PagedData } from '../../general/grid/paged-data';
import { ApiService } from '../../general/communication/api.service';

@Injectable()
export class CardService implements QueryData<Card> {

  constructor(private apiService: ApiService) { }

  query(pageSortFilter: PageSortFilter): Observable<PagedData<Card>> {
    return this.apiService.post<PagedData<Card>>('api/cards', pageSortFilter);
  }
}

