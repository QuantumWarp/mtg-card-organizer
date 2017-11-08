import { Component, ViewChildren } from '@angular/core';
import { Card } from '../../cards/card';

@Component({
  selector: 'app-card-search-page',
  templateUrl: './card-search-page.component.html',
  styleUrls: ['./card-search-page.component.css']
})
export class CardSearchPageComponent {
  selectedCard: Card;

  constructor() { }

  cardSelected(card: Card) {
    this.selectedCard = card;
  }
}
