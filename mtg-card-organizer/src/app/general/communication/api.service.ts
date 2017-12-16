import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class ApiService {
  apiBaseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  get<T>(path: string): Observable<T> {
    const headers = this.headers();
    return this.httpClient.get<T>(
      this.apiBaseUrl + '/' + path,
      { headers });
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.httpClient.post<T>(
      this.apiBaseUrl + '/' + path,
      JSON.stringify(body),
      { headers: this.headers() });
  }

  private headers(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json');
    return headers;
  }
}

