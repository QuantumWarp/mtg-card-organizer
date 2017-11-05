import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../card';
import { MockCards } from './mock-cards';

@Injectable()
export class CardService {
  
  constructor(private http: HttpClient) { }

  getCards(): Promise<Card[]> {
    return Promise.resolve(MockCards);
    // this.http.get<Card[]>('http://localhost:57894/api/cards').subscribe(data =>
    // {
    // })
  }
}

