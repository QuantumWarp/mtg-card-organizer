import { Component, Input, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CardFilterComponent } from '../card-filter/card-filter.component';
import { GridDataSource } from '../../general/grid/grid-data-source';
import { Card } from '../models/card';
import { PropertyFilter } from '../../general/grid/property-filter';
import { Filterer } from '../../general/grid/filterer';

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
    dialogRef.componentInstance.filter = this.filterer.filter.deepClone();
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterer.applyFilter(result);
      }
    });
  }
}
