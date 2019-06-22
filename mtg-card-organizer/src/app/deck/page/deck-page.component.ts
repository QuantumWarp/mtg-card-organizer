import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Card } from '../../card/models/card';
import { SnackNotificationModel } from '../../core/notifications/snack-notification.model';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';
import { LocalDataService } from '../../shared/utils/local-data-service';
import { Deck } from '../models/deck';
import { DeckCard } from '../models/deck-card';
import { DeckPart } from '../models/deck-part';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'mco-deck-page',
  templateUrl: './deck-page.component.html',
  styleUrls: ['./deck-page.component.scss'],
})
export class DeckPageComponent implements OnInit, AfterViewInit {
  deck: Deck;
  deckParts = DeckPart;

  mode: 'view' | 'edit' = 'view';

  changes = false;
  mainDataService = new LocalDataService([]);
  sideBoardDataService = new LocalDataService([]);

  constructor(
    public deckService: DeckService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: SnackNotificationService,
    public authService: AuthenticationService,
    private cdf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.deck = this.route.snapshot.data['deck'];
    });
  }

  ngAfterViewInit(): void {
    this.updateDataServices();
    this.cdf.detectChanges();
  }

  saveDeck(): void {
    this.deckService.update(this.deck).subscribe(() => {
      this.notificationService.notify(new SnackNotificationModel({
        message: 'Deck Saved',
        type: SnackNotificationType.Success,
      }));
      this.changes = false;
    });
  }

  openCardDialog(card: Card) {
    // this.dialog.open(CardDetailsModalComponent, { data: cardSet });
  }

  addCard(card: Card, deckPart: DeckPart): void {
    if (this.currentCardCount(card) >= 4) {
      return;
    }

    this.changes = true;
    const currentDeckCard = this.deck.deckCards.find(x => x.card.id === card.id && x.part === deckPart);
    if (currentDeckCard) {
      currentDeckCard.count = currentDeckCard.count + 1;
    } else {
      this.deck.deckCards.push(new DeckCard({
        cardId: card.id,
        card: card,
        count: 1,
        part: deckPart,
      }));
    }
    this.updateDataServices();
  }

  moveCard(deckCard: DeckCard, deckPart?: DeckPart): void {
    this.changes = true;
    deckCard.count = deckCard.count - 1;
    if (deckCard.count === 0) {
      const index = this.deck.deckCards.indexOf(deckCard);
      this.deck.deckCards.splice(index, 1);
    }

    if (deckPart !== undefined) {
      this.addCard(deckCard.card, deckPart);
    } else {
      this.updateDataServices();
    }
  }

  updateDataServices(): void {
    this.mainDataService.updateData(this.deck.deckCards.filter(x => x.part === DeckPart.Main));
    this.sideBoardDataService.updateData(this.deck.deckCards.filter(x => x.part === DeckPart.Sideboard));
  }

  countDeckPart(deckPart: DeckPart): number {
    return this.deck.deckCards
      .filter(x => x.part === deckPart)
      .map(x => x.count)
      .reduce((a, b) => a + b, 0);
  }

  private currentCardCount(card: Card): number {
    return this.deck.deckCards
      .filter(x => x.card.id === card.id)
      .map(x => x.count)
      .reduce((a, b) => a + b, 0);
  }
}
