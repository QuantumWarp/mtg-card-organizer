import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card';
import { Observable } from 'rxjs/Observable';
import { GetAllData } from '../../general/grid/grid-data-source.interfaces';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { PagedData } from '../../general/grid/paged-data';

@Injectable()
export class CardService implements GetAllData<Card> {

  constructor(private httpClient: HttpClient) { }

  getAll(pageSortFilter: PageSortFilter): Observable<PagedData<Card>> {
    return this.httpClient.post<PagedData<Card>>('http://localhost/api/cards/database', JSON.stringify(pageSortFilter));
  }
}

