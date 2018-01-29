import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';
import { QueryStringGenerator } from './query-string-generator.interface';
import { getFileNameFromResponseContentDisposition, saveFile } from '../../collection/services/download-helper';

@Injectable()
export class ApiService {
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  get<T>(path: string, queryStringGenerator?: QueryStringGenerator): Observable<T> {
    let url = this.apiBaseUrl + '/' + path;
    url = url + (queryStringGenerator ? '?' + queryStringGenerator.toQueryString() : '');
    return this.httpClient.get<T>(url, { headers: this.headers() });
  }

  post<T>(path: string, body: any): Observable<T> {
    const url = this.apiBaseUrl + '/' + path;
    return this.httpClient.post<T>(url, JSON.stringify(body), { headers: this.headers() });
  }

  delete<T>(path: string): Observable<T> {
    const url = this.apiBaseUrl + '/' + path;
    return this.httpClient.delete<T>(url, { headers: this.headers() });
  }

  download(path: string): void {
    const url = this.apiBaseUrl + '/' + path;
    
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json');

    // Process the file downloaded
    this.httpClient.get(url, { responseType: 'blob' }).subscribe(res => {
        //const fileName = getFileNameFromResponseContentDisposition(res);
        saveFile(res, 'collection-export.json');
    });
  }

  private headers(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json');
    return headers;
  }
}

