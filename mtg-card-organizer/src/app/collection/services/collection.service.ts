import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { Collection } from '../models/collection';
import { Paging } from '../../shared/filtering/paging';
import { PagedData } from '../../shared/filtering/paged-data';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private apiService: ApiService) { }

  get(collectionId: number): Observable<Collection> {
    return this.apiService.get<Collection>('api/collections/' + collectionId);
  }

  create(collectionName: string, containerId: number) {
    return this.apiService.post<Collection>('api/collections', new Collection({ name: collectionName, containerId: containerId }));
  }

  delete(collectionId: number) {
    return this.apiService.delete<boolean>('api/collections/' + collectionId);
  }

  // Bookmarks
  getBookmarks(paging?: Paging): Observable<PagedData<Collection>> {
    return this.apiService.get<PagedData<Collection>>('api/collections/bookmarks', paging);
  }

  toggleBookmark(collectionId: number): Observable<void> {
    return this.apiService.post(`api/collections/${collectionId}/toggle-bookmark`, {});
  }
}
