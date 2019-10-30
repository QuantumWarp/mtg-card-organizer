import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { PagedData } from '../../shared/filtering/paged-data';
import { Paging } from '../../shared/filtering/paging';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { UserPermissionModel } from '../models/user-permission.model';

@Injectable({
  providedIn: 'root',
})
export class ContainerPermissionService {
  constructor(private apiService: ApiService) { }

  query(containerId: number, paging?: Paging): Observable<PagedData<UserPermissionModel>> {
    return this.apiService.get(`api/containers/${containerId}/permissions`, paging);
  }

  updatePermission(containerId: number, userPermissionModel: UserPermissionModel): Observable<void> {
    return this.apiService.post(`api/containers/${containerId}/update-permission`, userPermissionModel);
  }
}

export class ContainerIdPermissionService extends DataService<UserPermissionModel> {
  constructor(
    private containerId: number,
    private containerPermissionService: ContainerPermissionService,
  ) {
    super();
  }

  query(paging?: Paging): Observable<PagedData<UserPermissionModel>> {
    return this.containerPermissionService.query(this.containerId, paging);
  }
}
