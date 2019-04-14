import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/internal/operators';

import { ApiService } from '../../core/communication/api.service';
import { PagedData } from '../../shared/filtering/paged-data';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { Set } from '../models/set';

@Injectable({
  providedIn: 'root',
})
export class SetService extends DataService<Set> {
  private cachedSets: Set[];

  constructor(private apiService: ApiService) {
    super();
  }

  query(): Observable<PagedData<Set>> {
    if (this.cachedSets) {
      return of(this.applyFilter(this.cachedSets));
    }

    return this.apiService.get<Set[]>('api/sets').pipe(
      tap(x => this.cachedSets = x),
      map(x => this.applyFilter(x)),
    );
  }

  private applyFilter(sets: Set[]): PagedData<Set> {
    return new PagedData({
      data: sets,
      totalCount: sets.length,
    });
  }
}
