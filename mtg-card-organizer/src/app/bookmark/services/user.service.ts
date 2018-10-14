import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { PagedData } from '../../shared/filtering/paged-data';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { UserModel } from '../models/user.model';
import { UserQuery } from '../models/user-query';

@Injectable()
export class UserService extends DataService<UserModel> {

  constructor(private apiService: ApiService) {
    super();
  }

  query(pageSortFilter?: UserQuery): Observable<PagedData<UserModel>> {
    return this.apiService.get('api/users', pageSortFilter);
  }
}
