import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { PropertyFilter } from '../../shared/filtering/property-filter';
import { PropertyFilterOperator } from '../../shared/filtering/property-filter-operator';
import { Collection } from '../models/collection';
import { CollectionService } from './collection.service';


@Injectable()
export class CollectionResolver implements Resolve<Collection> {
  constructor(private collectionService: CollectionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Collection> {
    const pageSortFilter = new PageSortFilter();
    pageSortFilter.addSubFilter(new PropertyFilter({
      property: 'id',
      operator: PropertyFilterOperator.IsEqual,
      value: route.paramMap.get('id')
    }));
    return this.collectionService.query(pageSortFilter).pipe(map(x => x.data[0]));
  }
}
