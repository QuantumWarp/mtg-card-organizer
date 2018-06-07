import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { PagedData } from '../../shared/filtering/paged-data';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { Card } from '../models/card';

@Injectable()
export class CardService implements DataService<Card> {

  constructor(private apiService: ApiService) { }

  query(pageSortFilter?: PageSortFilter): Observable<PagedData<Card>> {
    return this.apiService.get<PagedData<Card>>('api/cards', pageSortFilter);
  }
}

