import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../card';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CardService {

  constructor(private _http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this._http.get<Card[]>('http://localhost/api/cards');
  }
}

