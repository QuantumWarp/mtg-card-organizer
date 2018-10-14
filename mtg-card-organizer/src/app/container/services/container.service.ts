import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { Container } from '../models/container';
import { PagedData } from '../../shared/filtering/paged-data';
import { Paging } from '../../shared/filtering/paging';

@Injectable()
export class ContainerService {

  constructor(private apiService: ApiService) { }

  get(containerId: number): Observable<Container> {
    return this.apiService.get<Container>('api/containers/' + containerId);
  }

  create(containerName: string, parentId: number) {
    return this.apiService.post<Container>('api/containers', new Container({ name: containerName, parentId: parentId }));
  }

  delete(containerId: number) {
    return this.apiService.delete('api/containers/' + containerId);
  }

  export(containerId: number): void {
    this.apiService.download('api/containers/' + containerId + '/export');
  }

  import(containerId: number, importString: string): Observable<any> {
    return this.apiService.post('api/containers/' + containerId + '/import', importString);
  }

  bookmarks(paging?: Paging): Observable<PagedData<Container>> {
    return this.apiService.get('api/containers/bookmarks', paging);
  }

  toggleBookmark(containerId: number): Observable<void> {
    return this.apiService.post(`api/containers/${containerId}/toggle-bookmark`, {});
  }
}
