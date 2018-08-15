import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/services/authentication.service';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { Deck } from '../models/deck';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-deck-page',
  templateUrl: './deck-page.component.html',
})
export class DeckPageComponent implements OnInit {
  deck: Deck;

  constructor(
    public deckService: DeckService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: SnackNotificationService,
    public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.deck = this.route.snapshot.data['deck'];
    });
  }
}
