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
    return this.httpClient.get<T>(
      this.apiBaseUrl + '/' + path,
      { headers: this.headers() });
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.httpClient.post<T>(
      this.apiBaseUrl + '/' + path,
      JSON.stringify(body),
      { headers: this.headers() });
  }

  private headers(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}

