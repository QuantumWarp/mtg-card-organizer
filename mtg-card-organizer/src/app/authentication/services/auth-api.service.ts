import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { BaseApiService } from '../../core/communication/base-api.service';

@Injectable()
export class AuthApiService extends BaseApiService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, environment.identityServerUrl);
  }
}
