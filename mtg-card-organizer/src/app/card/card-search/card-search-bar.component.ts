import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';

import { Filterer } from '../../general/filtering/filterer';
import { GridDataSource } from '../../general/grid/grid-data-source';
import { CardFilterComponent } from '../card-filter/card-filter.component';
import { Card } from '../models/card';

@Component({
  selector: 'app-card-search-bar',
  templateUrl: './card-search-bar.component.html',
  styleUrls: ['../card.scss']
})
export class CardSearchBarComponent {
  @Input() cardDataSource: GridDataSource<Card>;
  @Input() filterer: Filterer;

  constructor(private dialog: MatDialog) { }

  openFilterDialog() {
    const dialogRef = this.dialog.open(CardFilterComponent, { disableClose: true });
    dialogRef.componentInstance.filters = this.filterer.filters.map(x => _.cloneDeep(x));
    dialogRef.afterClosed().subscribe(results => {
      if (results) {
        this.filterer.applyFilters(results);
      }
    });
  }
}
