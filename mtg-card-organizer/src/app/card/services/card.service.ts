import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { PagedData } from '../../shared/filtering/paged-data';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { CardQuery } from '../models/card-query';
import { CardSet } from '../models/card-set';
import { CardInstance } from '../../collection/models/card-instance';
import { map } from 'rxjs/internal/operators';
import { Card } from '../models/card';

@Injectable()
export class CardService implements DataService<Card> {

  constructor(private apiService: ApiService) { }

  query(cardQuery: CardQuery): Observable<PagedData<Card>> {
    return this.apiService.get<PagedData<Card>>('api/cards', cardQuery);
  }
}
