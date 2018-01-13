import { Component } from '@angular/core';

import { Card } from '../models/card';

@Component({
  selector: 'app-card-search-page',
  templateUrl: './card-search-page.component.html'
})
export class CardSearchPageComponent {
  selectedCard: Card;

  cardSelected(card: Card) {
    this.selectedCard = card;
  }
}
