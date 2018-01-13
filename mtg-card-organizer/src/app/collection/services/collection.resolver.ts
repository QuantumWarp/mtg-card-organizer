import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { PropertyFilter, PropertyFilterOperator } from '../../general/grid/property-filter';
import { CollectionService } from './collection.service';
import { Observable } from 'rxjs/Observable';
import { Collection } from '../models/collection';

@Injectable()
export class CollectionResolver implements Resolve<Collection> {
  constructor(private collectionService: CollectionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Collection> {
    const pageSortFilter = new PageSortFilter();
    pageSortFilter.filter.addSubFilter(new PropertyFilter(
      'id',
      PropertyFilterOperator.Equals,
      route.paramMap.get('id')
    ));
    return this.collectionService.query(pageSortFilter).map(x => x.data[0]);
  }
}
