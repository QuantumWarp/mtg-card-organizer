import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Card } from '../../card/models/card';
import { LocalDataService } from '../../shared/utils/local-data-service';
import { Deck } from '../models/deck';
import { DeckCard } from '../models/deck-card';
import { DeckPart } from '../models/deck-part';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-deck-page',
  templateUrl: './deck-page.component.html',
  styleUrls: ['./deck-page.component.scss']
})
export class DeckPageComponent implements OnInit {
  deck: Deck;
  deckParts = DeckPart;

  mode: 'view' | 'edit' = 'view';

  mainDataService = new LocalDataService([]);
  sideBoardDataService = new LocalDataService([]);

  constructor(
    public deckService: DeckService,
    private route: ActivatedRoute,
    public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.deck = this.route.snapshot.data['deck'];
      this.updateDataServices();
    });
  }

  addCard(card: Card, deckPart: DeckPart): void {
    console.log(card);
    const currentDeckCard = this.deck.cards.find(x => x.card.id === card.id && x.deckPart === deckPart);
    if (currentDeckCard) {
      currentDeckCard.count = currentDeckCard.count + 1;
    } else {
      this.deck.cards.push(new DeckCard({
        card: card,
        count: 1,
        deckPart: deckPart,
      }));
    }
    this.updateDataServices();
  }

  moveCard(deckCard: DeckCard, deckPart?: DeckPart): void {
    console.log('move');
    deckCard.count = deckCard.count - 1;
    if (deckCard.count === 0) {
      const index = this.deck.cards.indexOf(deckCard);
      this.deck.cards.splice(index, 1);
    }

    if (deckPart !== undefined) {
      this.addCard(deckCard.card, deckPart);
    } else {
      this.updateDataServices();
    }
  }

  updateDataServices() {
    this.mainDataService.updateData(this.deck.cards.filter(x => x.deckPart === DeckPart.Main));
    this.sideBoardDataService.updateData(this.deck.cards.filter(x => x.deckPart === DeckPart.Sideboard));
  }
}
