import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CardDetailsModalComponent } from '../../details/modal/card-details-modal.component';
import { CardQuery } from '../../models/card-query';
import { CardSet } from '../../models/card-set';

@Component({
  templateUrl: './card-search-page.component.html',
  styleUrls: ['./card-search-page.component.scss'],
})
export class CardSearchPageComponent {
  filter = new CardQuery();

  constructor(private dialog: MatDialog) { }

  cardSetSelected(cardSet: CardSet) {
    this.dialog.open(CardDetailsModalComponent, { data: cardSet });
  }
}
