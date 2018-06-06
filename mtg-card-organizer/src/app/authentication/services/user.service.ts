import { Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { QueryStringGenerator } from '../../general/communication/query-string-generator.interface';
import { BasicQueryStringGenerator } from '../../general/communication/basic-query-string-generator';

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
