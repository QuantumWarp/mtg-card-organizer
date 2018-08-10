import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { PagedData } from '../../shared/filtering/paged-data';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { CardQuery } from '../models/card-query';
import { CardSet } from '../models/card-set';

@Injectable()
export class CardService implements DataService<CardSet> {

  constructor(private apiService: ApiService) { }

  query(cardQuery: CardQuery): Observable<PagedData<CardSet>> {
    return this.apiService.get<PagedData<CardSet>>('api/cards', cardQuery);
  }
}

