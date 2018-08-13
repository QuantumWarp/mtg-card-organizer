import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { PagedData } from '../../shared/filtering/paged-data';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { Container } from '../models/container';

@Injectable()
export class ContainerService implements DataService<Container> {

  constructor(private apiService: ApiService) { }

  query(pageSortFilter: PageSortFilter): Observable<PagedData<Container>> {
    return this.apiService.get<PagedData<Container>>('api/containers', pageSortFilter);
  }

  get(containerId?: number): Observable<Container> {
    const url = containerId ? 'api/containers/' + containerId : 'api/containers';
    return this.apiService.get<Container>(url);
  }

  create(containerName: string, parentId: number) {
    return this.apiService.post<Container>('api/containers', new Container({ name: containerName, parentId: parentId }));
  }

  delete(containerId: number) {
    return this.apiService.delete('api/containers/' + containerId);
  }
}
