import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CardDetailsModalComponent } from '../card-details/card-details-modal.component';
import { CardSet } from '../models/card-set';

@Component({
  templateUrl: './card-search-page.component.html'
})
export class CardSearchPageComponent {

  constructor(private dialog: MatDialog) { }

  cardSetSelected(cardSet: CardSet) {
    this.dialog.open(CardDetailsModalComponent, { data: cardSet });
  }
}
