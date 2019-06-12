import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CardInstance } from '../models/card-instance';
import { CardQuery } from '../../card/models/card-query';
import { ApiService } from '../../core/communication/api.service';
import { PagedData } from '../../shared/filtering/paged-data';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { CardInstanceGroupedCardSet } from '../models/card-instance-grouped-card-set';
import { CardInstanceGroupedCard } from '../models/card-instance-grouped-card';

@Injectable({
  providedIn: 'root',
})
export class CollectionCardQueryService {
  constructor(private apiService: ApiService) { }

  queryGroupedByCard(cardQuery: CardQuery): Observable<PagedData<CardInstanceGroupedCard>> {
    return this.apiService.get<PagedData<CardInstanceGroupedCard>>('api/collections/cards/group-by-card', cardQuery);
  }

  queryGroupedByCardSet(cardQuery: CardQuery): Observable<PagedData<CardInstanceGroupedCardSet>> {
    return this.apiService.get<PagedData<CardInstanceGroupedCardSet>>('api/collections/cards/group-by-card-set', cardQuery);
  }

  queryInstances(cardQuery: CardQuery): Observable<PagedData<CardInstance>> {
    return this.apiService.get<PagedData<CardInstance>>('api/collections/cards', cardQuery);
  }
}

export class CollectionGroupedByCardServiceWrapper extends DataService<CardInstanceGroupedCard> {
  constructor(
    public collectionId: number,
    private collectionCardQueryService: CollectionCardQueryService,
  ) {
    super();
  }

  query(cardQuery: CardQuery): Observable<PagedData<CardInstanceGroupedCard>> {
    cardQuery.collectionIds = [ this.collectionId ];
    return this.collectionCardQueryService.queryGroupedByCard(cardQuery);
  }
}

export class CollectionGroupedByCardSetServiceWrapper extends DataService<CardInstanceGroupedCardSet> {
  constructor(
    public collectionId: number,
    private collectionCardQueryService: CollectionCardQueryService,
  ) {
    super();
  }

  query(cardQuery: CardQuery): Observable<PagedData<CardInstanceGroupedCardSet>> {
    cardQuery.collectionIds = [ this.collectionId ];
    return this.collectionCardQueryService.queryGroupedByCardSet(cardQuery);
  }
}

export class CollectionInstanceServiceWrapper extends DataService<CardInstance> {
  constructor(
    public collectionId: number,
    private collectionCardQueryService: CollectionCardQueryService,
  ) {
    super();
  }

  query(cardQuery: CardQuery): Observable<PagedData<CardInstance>> {
    cardQuery.collectionIds = [ this.collectionId ];
    return this.collectionCardQueryService.queryInstances(cardQuery);
  }
}
