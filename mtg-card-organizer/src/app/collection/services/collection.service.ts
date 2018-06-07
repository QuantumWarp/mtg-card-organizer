import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Card } from '../../card/models/card';
import { CardOtherInfo } from '../../card/models/card-other-info';
import { ApiService } from '../../core/communication/api.service';
import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { PagedData } from '../../shared/filtering/paged-data';
import { PropertyFilter } from '../../shared/filtering/property-filter';
import { PropertyFilterOperator } from '../../shared/filtering/property-filter-operator';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { Collection } from '../models/collection';

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

  addCards(collectionId: number, cardOtherInfos: CardOtherInfo[]): Observable<boolean> {
    return this.apiService.post<boolean>('api/collections/' + collectionId + '/cards', cardOtherInfos);
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

  export(collectionId: number): void {
    this.apiService.download('api/collections/' + collectionId + '/download');
  }

  import(collectionId: number | undefined, importString: string): void {
    if (collectionId) {
      this.apiService.post('api/collections/' + collectionId + '/import', importString);
    } else {
      this.apiService.post('api/collections/import', importString);
    }
  }
}

export class CollectionCardServiceWrapper implements DataService<Card> {
  constructor(public collectionId: number, private collectionService: CollectionService) { }

  query(pageSortFilter: PageSortFilter): Observable<PagedData<Card>> {
    return this.collectionService.queryCards(this.collectionId, pageSortFilter);
  }
}
