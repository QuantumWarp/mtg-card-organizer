import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CardInstance } from '../models/card-instance';
import { CardQuery } from '../../card/models/card-query';
import { ApiService } from '../../core/communication/api.service';
import { PagedData } from '../../shared/filtering/paged-data';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';

@Injectable()
export class CollectionCardService {

  constructor(private apiService: ApiService) { }

  queryCards(collectionId: number, cardQuery: CardQuery): Observable<PagedData<CardInstance>> {
    return this.apiService.get<PagedData<CardInstance>>('api/collections/' + collectionId + '/cards', cardQuery);
  }

  addCards(collectionId: number, cardInstances: CardInstance[]): Observable<void> {
    return this.apiService.post('api/collections/' + collectionId + '/cards', cardInstances);
  }

  deleteCards(collectionId: number, cardInstanceIds: number[]): Observable<void> {
    return this.apiService.post('api/collections/' + collectionId + '/cards/delete', cardInstanceIds);
  }
}

export class CollectionCardServiceWrapper implements DataService<CardInstance> {
  constructor(public collectionId: number, private collectionCardService: CollectionCardService) { }

  query(cardQuery: CardQuery): Observable<PagedData<CardInstance>> {
    return this.collectionCardService.queryCards(this.collectionId, cardQuery);
  }
}
