import { Component, Output, EventEmitter } from '@angular/core';
import { Card } from '../../card/models/card';
import { CardQuery } from '../../card/models/card-query';
import { CardService } from '../../card/services/card.service';
import { WrappedDataService } from '../../shared/utils/wrapped-data-service';

@Component({
  selector: 'app-deck-card-search',
  templateUrl: './deck-card-search.component.html',
  styleUrls: ['./deck-card-search.component.scss']
})
export class DeckCardSearchComponent {
  @Output() toMain = new EventEmitter<Card>();
  @Output() toSideboard = new EventEmitter<Card>();
  @Output() save = new EventEmitter();
  @Output() rowSelected = new EventEmitter<Card>();

  filter = new CardQuery();

  wrappedService: WrappedDataService<Card, Card>;

  constructor(cardService: CardService) {
    this.wrappedService = WrappedDataService.construct(cardService);
  }
}
