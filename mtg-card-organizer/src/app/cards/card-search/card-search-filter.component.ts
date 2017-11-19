import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PageSortFilter } from '../../general/grid/page-sort-filter';

@Component({
  selector: 'app-card-search-filter',
  templateUrl: './card-search-filter.component.html'
})
export class CardSearchFilterComponent {
  @Input() cardSearchFilter: PageSortFilter;

  constructor(public dialogRef: MatDialogRef<CardSearchFilterComponent>) { }

  apply() {
    this.dialogRef.close();
  }
}
