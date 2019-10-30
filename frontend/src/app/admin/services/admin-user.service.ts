import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { PagedData } from '../../shared/filtering/paged-data';
import { AdminUserModel } from '../users/admin-user.model';
import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService extends DataService<AdminUserModel> {
  constructor(private apiService: ApiService) {
    super();
  }

  query(pageSortFilter?: PageSortFilter): Observable<PagedData<AdminUserModel>> {
    return this.apiService.get('api/admin/users', pageSortFilter);
  }

  toggleUserSuspension(userId: string): Observable<void> {
    return this.apiService.post(`api/admin/users/${userId}/toggle-suspension`, {});
  }

  remove(userId: string): Observable<void> {
    return this.apiService.delete(`api/admin/users/${userId}`);
  }
}
