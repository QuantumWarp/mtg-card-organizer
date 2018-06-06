import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { QueryStringGenerator } from './query-string-generator.interface';
import { getFileNameFromResponseContentDisposition, saveFile } from '../../collection/services/download-helper';
import { AuthenticationService } from '../../authentication/services/authentication.service';

export class BaseApiService {
  constructor(
    protected httpClient: HttpClient,
    protected apiBaseUrl: string,
    protected authService?: AuthenticationService) { }

  public get<T>(path: string, queryStringGenerator?: QueryStringGenerator): Observable<T> {
    let url = this.apiBaseUrl + '/' + path;
    url = url + (queryStringGenerator ? '?' + queryStringGenerator.toQueryString() : '');
    return this.httpClient.get<T>(url, { headers: this.headers() });
  }

  public post<T>(path: string, body: any): Observable<T> {
    const url = this.apiBaseUrl + '/' + path;
    return this.httpClient.post<T>(url, JSON.stringify(body), { headers: this.headers() });
  }

  public delete<T>(path: string): Observable<T> {
    const url = this.apiBaseUrl + '/' + path;
    return this.httpClient.delete<T>(url, { headers: this.headers() });
  }

  public download(path: string): void {
    const url = this.apiBaseUrl + '/' + path;

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.accessToken);

    // Process the file downloaded
    this.httpClient.get(url, { responseType: 'blob', headers: headers }).subscribe(res => {
        // const fileName = getFileNameFromResponseContentDisposition(res);
        saveFile(res, 'collection-export-' + new Date().getTime() + '.json');
    });
  }

  private headers(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.authService) {
      headers = headers.set('Authorization', 'Bearer ' + this.authService.accessToken);
    }
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json');
    return headers;
  }
}

