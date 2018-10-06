import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BasicQueryStringGenerator } from '../../shared/utils/basic-query-string-generator';
import { UserModel } from '../models/user.model';
import { ApiService } from '../../core/communication/api.service';

@Injectable()
export class UserService {
  constructor(private apiService: ApiService) {}

  idsToUsers(ids: string[]): Observable<UserModel[]> {
    return this.apiService.post('api/auth/usernames', ids);
  }

  searchUsers(search: string): Observable<UserModel[]> {
    return this.apiService.get('api/auth/user-search', new BasicQueryStringGenerator({
      search: search
    }));
  }
}
