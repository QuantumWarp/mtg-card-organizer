import { Component } from '@angular/core';

import { Card } from '../models/card';
import { MatDialog } from '@angular/material';
import { CardDetailsModalComponent } from '../card-details/card-details-modal.component';

@Component({
  templateUrl: './card-search-page.component.html'
})
export class CardSearchPageComponent {

  constructor(private dialog: MatDialog) { }

  cardSelected(card: Card) {
    const dialogRef = this.dialog.open(CardDetailsModalComponent);
    dialogRef.componentInstance.card = card;
  }
}
