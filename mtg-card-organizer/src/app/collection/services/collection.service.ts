import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Card } from '../../card/models/card';
import { ApiService } from '../../general/communication/api.service';
import { DataService } from '../../general/grid/grid-data-source.interfaces';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { PagedData } from '../../general/grid/paged-data';
import { PropertyFilter, PropertyFilterOperator } from '../../general/grid/property-filter';
import { Collection } from '../models/collection';

@Injectable()
export class CollectionService implements DataService<Collection> {

  constructor(private apiService: ApiService) { }

  query(pageSortFilter: PageSortFilter): Observable<PagedData<Collection>> {
    return this.apiService.post<PagedData<Collection>>('api/collections', pageSortFilter);
  }

  queryBaseCollections(pageSortFilter: PageSortFilter): Observable<PagedData<Collection>> {
    pageSortFilter.filter.addSubFilter(new PropertyFilter('parentId', PropertyFilterOperator.Equals, null));
    return this.apiService.post<PagedData<Collection>>('api/collections', pageSortFilter);
  }

  queryCards(collectionId: number, pageSortFilter: PageSortFilter): Observable<PagedData<Card>> {
    return this.apiService.post<PagedData<Card>>('api/collections/' + collectionId, pageSortFilter);
  }

  addCards(collectionId: number, cardSetIds: number[]): Observable<boolean> {
    return this.apiService.post<boolean>('api/collections/' + collectionId + '/add', cardSetIds);
  }

  importCards(collectionId: number, importString: string): Observable<boolean> {
    return this.apiService.post<boolean>('api/collections/' + collectionId + 'import', importString);
  }

  createCollection(collectionName: string, parentCollectionId?: number) {
    return this.apiService.post<boolean>('api/collections/create', { collectionName: collectionName, parentCollectionId: parentCollectionId });
  }

  deleteCollection(collectionId: number) {
    return this.apiService.post<boolean>('api/collections/' + collectionId + '/delete', {});
  }
}

export class CollectionCardServiceWrapper implements DataService<Card> {
  constructor(public collectionId: number, private collectionService: CollectionService) { }

  query(pageSortFilter: PageSortFilter): Observable<PagedData<Card>> {
    return this.collectionService.queryCards(this.collectionId, pageSortFilter);
  }
}
