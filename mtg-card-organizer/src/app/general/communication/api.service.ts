import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApiService } from './base-api.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService extends BaseApiService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, environment.identityServerUrl);
  }
}
