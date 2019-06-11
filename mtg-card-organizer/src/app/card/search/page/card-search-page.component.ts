import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { filter } from 'rxjs/internal/operators';

import { CardDetailsModalComponent } from '../../details/modal/card-details-modal.component';
import { CardFilterData } from '../../filter/card-filter-data';
import { CardFilterComponent } from '../../filter/card-filter.component';
import { CardQuery } from '../../models/card-query';
import { CardSet } from '../../models/card-set';

@Component({
  templateUrl: './card-search-page.component.html',
  styleUrls: ['./card-search-page.component.scss'],
})
export class CardSearchPageComponent {
  filter = new CardQuery();

  constructor(
    private dialog: MatDialog,
  ) { }

  cardSetSelected(cardSet: CardSet): void {
    this.dialog.open(CardDetailsModalComponent, { data: cardSet });
  }

  openFilter(): void {
    const filterDialog = this.dialog.open(CardFilterComponent, {
      data: new CardFilterData({
        collectionSearch: false,
        currentFilter: this.filter,
      }),
    });

    filterDialog.afterClosed().subscribe((result) => {
      if (!result) { return; }
      this.filter = result;
    });
  }
}
