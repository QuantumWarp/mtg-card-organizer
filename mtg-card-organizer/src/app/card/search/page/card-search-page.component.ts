import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ConvertedCard } from '../../../collection/models/converted-card';
import { CardDetailsModalComponent } from '../../details/modal/card-details-modal.component';
import { CardFilterData } from '../../filter/card-filter-data';
import { CardFilterComponent } from '../../filter/card-filter.component';
import { CardQuery } from '../../models/card-query';

@Component({
  templateUrl: './card-search-page.component.html',
  styleUrls: ['./card-search-page.component.scss'],
})
export class CardSearchPageComponent {
  filter = new CardQuery({ groupByCardSet: true });

  constructor(
    private dialog: MatDialog,
  ) { }

  rowSelected(convertedCard: ConvertedCard): void {
    this.dialog.open(CardDetailsModalComponent, { data: convertedCard });
  }

  openFilter(): void {
    const filterDialog = this.dialog.open(CardFilterComponent, {
      data: new CardFilterData({
        currentFilter: this.filter,
      }),
    });

    filterDialog.afterClosed().subscribe((result) => {
      if (!result) { return; }
      this.filter = result;
    });
  }
}
