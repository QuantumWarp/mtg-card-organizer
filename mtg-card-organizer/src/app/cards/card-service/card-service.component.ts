import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../card';

@Component({
  selector: 'card-service',
  templateUrl: './card-service.component.html',
  styleUrls: ['./card-service.component.css']
})
export class CardServiceComponent implements OnInit {

  cards: Card[];
  card0: Card;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Card[]>('http://localhost:57894/api/cards').subscribe(data =>
    {
      this.cards = data;
      this.card0 = this.cards[0];
    })
  }
}
