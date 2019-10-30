import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Collection } from '../models/collection';
import { CollectionService } from './collection.service';

@Injectable()
export class CollectionResolver implements Resolve<Collection> {
  constructor(private collectionService: CollectionService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Collection> {
    return this.collectionService.get(Number(route.paramMap.get('id')));
  }
}
