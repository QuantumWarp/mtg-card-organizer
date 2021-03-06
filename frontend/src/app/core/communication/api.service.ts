import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { QueryStringGenerator } from '../../shared/utils/query-string-generator.interface';
import { saveFile } from '../../shared/utils/download-helper';

@Injectable()
export class ApiService {
  constructor(
    private httpClient: HttpClient) { }

  public get<T>(path: string, queryStringGenerator?: QueryStringGenerator): Observable<T> {
    let url = environment.apiBaseUrl + '/' + path;
    url = url + (queryStringGenerator ? '?' + queryStringGenerator.toQueryString() : '');
    return this.httpClient.get<T>(url, { headers: this.headers() });
  }

  public post<T>(path: string, body: any): Observable<T> {
    const url = environment.apiBaseUrl + '/' + path;
    return this.httpClient.post<T>(url, JSON.stringify(body), { headers: this.headers() });
  }

  public patch<T>(path: string, body: any): Observable<T> {
    const url = environment.apiBaseUrl + '/' + path;
    return this.httpClient.patch<T>(url, JSON.stringify(body), { headers: this.headers() });
  }

  public delete<T>(path: string): Observable<T> {
    const url = environment.apiBaseUrl + '/' + path;
    return this.httpClient.delete<T>(url, { headers: this.headers() });
  }

  public download(path: string): void {
    const url = environment.apiBaseUrl + '/' + path;

    // Process the file downloaded
    this.httpClient.get(url, { responseType: 'blob' }).subscribe(res => {
        // const fileName = getFileNameFromResponseContentDisposition(res);
        saveFile(res, 'collection-export-' + new Date().getTime() + '.json');
    });
  }

  private headers(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json');
    return headers;
  }
}
