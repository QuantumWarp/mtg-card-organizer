import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { PagedData } from '../../shared/filtering/paged-data';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { Deck } from '../models/deck';

@Injectable()
export class DeckService implements DataService<Deck> {

  constructor(private apiService: ApiService) { }

  query(pageSortFilter: PageSortFilter): Observable<PagedData<Deck>> {
    return this.apiService.get<PagedData<Deck>>('api/decks', pageSortFilter);
  }

  create(collectionName: string, containerId: number) {
    return this.apiService.post<boolean>('api/decks', new Deck({ name: collectionName, containerId: containerId }));
  }

  delete(collectionId: number) {
    return this.apiService.delete<boolean>('api/decks/' + collectionId);
  }
}
