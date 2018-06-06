import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { BaseApiService } from '../../general/communication/base-api.service';
import { Observable } from 'rxjs';
import { LoadingService } from '../../general/loading/loading.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  templateUrl: './api-tester.component.html',
  styleUrls: ['./api-tester.scss']
})
export class ApiTesterComponent {
  baseApiUrl = environment.apiBaseUrl;
  apiPath = '';
  requestBody = '';
  requestMethodType = 'GET';
  responseContent = '';

  constructor(
    private loadingService: LoadingService,
    private httpClient: HttpClient,
    private authService: AuthenticationService) {}

  async send(): Promise<void> {
    const apiService = new BaseApiService(this.httpClient, this.baseApiUrl, this.authService);
    let responsePromise: Promise<{}>;

    switch (this.requestMethodType) {
      case 'GET':
      responsePromise = apiService.get(this.apiPath).toPromise();
        break;
      case 'POST':
      responsePromise = apiService.post(this.apiPath, JSON.parse(this.requestBody)).toPromise();
        break;
      default:
        return;
    }

    this.loadingService.load('Sending Request...', responsePromise);
    this.responseContent = JSON.stringify(await responsePromise, null, 2);
  }
}
