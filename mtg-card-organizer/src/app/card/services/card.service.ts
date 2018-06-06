import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../general/communication/api.service';
import { PageSortFilter } from '../../general/filtering/page-sort-filter';
import { PagedData } from '../../general/filtering/paged-data';
import { DataService } from '../../general/grid/grid-data-source.interfaces';
import { Card } from '../models/card';

@Injectable()
export class CardService implements DataService<Card> {

  constructor(private apiService: ApiService) { }

  query(pageSortFilter?: PageSortFilter): Observable<PagedData<Card>> {
    return this.apiService.get<PagedData<Card>>('api/cards', pageSortFilter);
  }
}

