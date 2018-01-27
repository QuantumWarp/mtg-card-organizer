import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Card } from '../../card/models/card';
import { ApiService } from '../../general/communication/api.service';
import { DataService } from '../../general/grid/grid-data-source.interfaces';
import { PageSortFilter } from '../../general/filtering/page-sort-filter';
import { PagedData } from '../../general/filtering/paged-data';
import { PropertyFilter } from '../../general/filtering/property-filter';
import { Collection } from '../models/collection';
import { PropertyFilterOperator } from '../../general/filtering/property-filter-operator';

@Injectable()
export class CollectionService implements DataService<Collection> {

  constructor(private apiService: ApiService) { }

  query(pageSortFilter: PageSortFilter): Observable<PagedData<Collection>> {
    return this.apiService.get<PagedData<Collection>>('api/collections', pageSortFilter);
  }

  queryBaseCollections(pageSortFilter: PageSortFilter): Observable<PagedData<Collection>> {
    pageSortFilter.addSubFilter(new PropertyFilter({
      property: 'parentId',
      operator: PropertyFilterOperator.IsEqual,
      value: null,
    }));
    return this.apiService.get<PagedData<Collection>>('api/collections', pageSortFilter);
  }

  queryCards(collectionId: number, pageSortFilter: PageSortFilter): Observable<PagedData<Card>> {
    return this.apiService.get<PagedData<Card>>('api/collections/' + collectionId + '/cards', pageSortFilter);
  }

  addCards(collectionId: number, cardSetIds: number[]): Observable<boolean> {
    return this.apiService.post<boolean>('api/collections/' + collectionId + '/cards', cardSetIds);
  }

  importCards(collectionId: number, importString: string): Observable<boolean> {
    return this.apiService.post<boolean>('api/collections/' + collectionId + '/import', importString);
  }

  createCollection(collectionName: string, parentCollectionId?: number) {
    return this.apiService.post<boolean>('api/collections', new Collection({ name: collectionName, parentId: parentCollectionId }));
  }

  deleteCollection(collectionId: number) {
    return this.apiService.delete<boolean>('api/collections/' + collectionId);
  }
}

export class CollectionCardServiceWrapper implements DataService<Card> {
  constructor(public collectionId: number, private collectionService: CollectionService) { }

  query(pageSortFilter: PageSortFilter): Observable<PagedData<Card>> {
    return this.collectionService.queryCards(this.collectionId, pageSortFilter);
  }
}
