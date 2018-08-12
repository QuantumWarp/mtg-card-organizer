import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { PagedData } from '../../shared/filtering/paged-data';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { CardQuery } from '../models/card-query';
import { CardSet } from '../models/card-set';
import { CardInstance } from '../models/card-instance';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class CardService implements DataService<CardSet> {

  constructor(private apiService: ApiService) { }

  query(cardQuery: CardQuery): Observable<PagedData<CardSet>> {
    return this.apiService.get<PagedData<CardSet>>('api/cards', cardQuery);
  }
}

export class CardServiceInstanceWrapper implements DataService<CardInstance> {

  constructor(private cardService: CardService) { }

  query(cardQuery: CardQuery): Observable<PagedData<CardInstance>> {
    return this.cardService.query(cardQuery).pipe(
      map(x => new PagedData<CardInstance>({
        data: x.data.map(cs => new CardInstance({ cardSet: cs })),
        totalCount: x.totalCount,
      }))
    );
  }
}

