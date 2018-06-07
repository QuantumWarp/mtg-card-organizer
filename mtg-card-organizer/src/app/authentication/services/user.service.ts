import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BasicQueryStringGenerator } from '../../shared/utils/basic-query-string-generator';
import { UserModel } from '../models/user.model';
import { AuthApiService } from './auth-api.service';

@Injectable()
export class UserService {
  constructor(private authApiService: AuthApiService) {}

  idsToUsers(ids: string[]): Observable<UserModel[]> {
    return this.authApiService.post('api/auth/usernames', ids);
  }

  searchUsers(search: string): Observable<UserModel[]> {
    return this.authApiService.get('api/auth/user-search', new BasicQueryStringGenerator({
      search: search
    }));
  }
}
