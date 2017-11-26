import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CardSearchFilterComponent } from './card-search-filter.component';
import { GridDataSource } from '../../general/grid/grid-data-source';
import { Card } from '../card';

@Component({
  selector: 'app-card-search-bar',
  templateUrl: './card-search-bar.component.html'
})
export class CardSearchBarComponent {
  @Input() cardDataSource: GridDataSource<Card>;

  constructor(private dialog: MatDialog) { }

  openFilterDialog() {
    const dialogRef = this.dialog.open(CardSearchFilterComponent, { disableClose: true });
    // dialogRef.componentInstance.cardSearchFilter = this.cardDataSource.;
  }
}
