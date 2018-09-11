import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { PagedData } from '../../shared/filtering/paged-data';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { CardQuery } from '../models/card-query';
import { CardSet } from '../models/card-set';
import { CardInstance } from '../../collection/models/card-instance';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class CardSetService extends DataService<CardSet> {

  constructor(private apiService: ApiService) {
    super();
  }

  query(cardQuery: CardQuery): Observable<PagedData<CardSet>> {
    return this.apiService.get<PagedData<CardSet>>('api/card-sets', cardQuery);
  }
}

export class CardServiceInstanceWrapper extends DataService<CardInstance> {

  constructor(private cardSetService: CardSetService) {
    super();
  }

  query(cardQuery: CardQuery): Observable<PagedData<CardInstance>> {
    return this.cardSetService.query(cardQuery).pipe(
      map(x => new PagedData<CardInstance>({
        data: x.data.map(cs => new CardInstance({ cardSet: cs })),
        totalCount: x.totalCount,
      }))
    );
  }
}

