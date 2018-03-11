import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApiService } from '../../general/communication/base-api.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthApiService extends BaseApiService {
  constructor(protected httpClient: HttpClient) { 
    super(httpClient, environment.identityServerUrl);
  }
}
