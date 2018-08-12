import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CardDetailsModalComponent } from '../card-details/card-details-modal.component';
import { CardInstance } from '../models/card-instance';

@Component({
  templateUrl: './card-search-page.component.html'
})
export class CardSearchPageComponent {

  constructor(private dialog: MatDialog) { }

  cardInstanceSelected(cardInstance: CardInstance) {
    console.log(cardInstance);
    const dialogRef = this.dialog.open(CardDetailsModalComponent);
    dialogRef.componentInstance.cardInstance = cardInstance;
  }
}
