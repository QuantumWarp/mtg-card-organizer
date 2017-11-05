import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatList, MatListItem, MatButton } from '@angular/material';
import { Card } from '../card';
import { CardService } from '../card-service/card.service';

@Component({
  selector: 'card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent implements OnInit {
  cards: Card[];
  selectedCard: Card;
  @Output() selectedCardChange = new EventEmitter<Card>();

  constructor(private cardService: CardService) { }

  cardClick(card: Card): void {
    this.selectedCard = card;
    this.selectedCardChange.emit(this.selectedCard);
  }

  ngOnInit(): void {
    this.cardService.getCards().then(cards => this.cards = cards);
  }
}
