import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { CardInstance } from '../models/card-instance';

@Injectable({
  providedIn: 'root',
})
export class CollectionCardService {
  constructor(private apiService: ApiService) { }

  addCards(collectionId: number, cardInstances: CardInstance[]): Observable<void> {
    return this.apiService.post('api/collections/' + collectionId + '/cards', cardInstances);
  }

  deleteCards(collectionId: number, cardInstanceIds: number[]): Observable<void> {
    return this.apiService.post('api/collections/' + collectionId + '/cards/delete', cardInstanceIds);
  }
}
