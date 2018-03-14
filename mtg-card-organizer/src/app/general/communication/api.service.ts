import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApiService } from './base-api.service';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Injectable()
export class ApiService extends BaseApiService {
  constructor(protected httpClient: HttpClient, protected authService: AuthenticationService) {
    super(httpClient, environment.apiBaseUrl, authService);
  }
}
