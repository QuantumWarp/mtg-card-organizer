import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CardFilterData } from '../../card/filter/card-filter-data';
import { CardFilterComponent } from '../../card/filter/card-filter.component';
import { Card } from '../../card/models/card';
import { CardQuery } from '../../card/models/card-query';
import { WrappedDataService } from '../../shared/utils/wrapped-data-service';
import { ConvertedCard } from '../../collection/models/converted-card';

@Component({
  selector: 'mco-deck-card-search',
  templateUrl: './deck-card-search.component.html',
  styleUrls: ['./deck-card-search.component.scss'],
})
export class DeckCardSearchComponent {
  @Output() toMain = new EventEmitter<Card>();
  @Output() toSideboard = new EventEmitter<Card>();
  @Output() save = new EventEmitter();
  @Output() rowSelected = new EventEmitter<ConvertedCard>();

  filter = new CardQuery({ groupByCard: true });

  wrappedService: WrappedDataService<Card, Card>;

  constructor(
    private dialog: MatDialog,
  ) { }

  openFilter(): void {
    const filterDialog = this.dialog.open(CardFilterComponent, {
      data: new CardFilterData({
        currentFilter: this.filter,
      }),
    });
    filterDialog.afterClosed().subscribe(result => {
      if (!result) { return; }
      this.filter = result;
    });
  }
}
