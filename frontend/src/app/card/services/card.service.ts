import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { PagedData } from '../../shared/filtering/paged-data';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { Card } from '../models/card';
import { CardQuery } from '../models/card-query';

@Injectable({
  providedIn: 'root',
})
export class CardService extends DataService<Card> {
  constructor(private apiService: ApiService) {
    super();
  }

  query(cardQuery: CardQuery): Observable<PagedData<Card>> {
    return this.apiService.get<PagedData<Card>>('api/cards', cardQuery);
  }
}
