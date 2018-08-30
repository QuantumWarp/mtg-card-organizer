import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/services/authentication.service';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { Deck } from '../models/deck';
import { DeckService } from '../services/deck.service';
import { LocalDataService } from '../../shared/utils/local-data-service';
import { DeckPart } from '../models/deck-part';
import { WrappedDataService } from '../../shared/utils/wrapped-data-service';

@Component({
  selector: 'app-deck-page',
  templateUrl: './deck-page.component.html',
  styleUrls: ['./deck-page.component.scss']
})
export class DeckPageComponent implements OnInit {
  deck: Deck;

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

  updateDataServices() {
    this.mainDataService.updateData(this.deck.cards.filter(x => x.deckPart === DeckPart.Main));
    this.sideBoardDataService.updateData(this.deck.cards.filter(x => x.deckPart === DeckPart.Sideboard));
  }
}
