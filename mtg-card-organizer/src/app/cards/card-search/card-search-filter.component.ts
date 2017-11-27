import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { PropertyFilter } from '../../general/grid/property-filter';

@Component({
  selector: 'app-card-search-filter',
  templateUrl: './card-search-filter.component.html'
})
export class CardSearchFilterComponent implements OnInit {
  @Input() filter: PropertyFilter;
  nameFilter: string;

  constructor(public dialogRef: MatDialogRef<CardSearchFilterComponent>) { }

  ngOnInit(): void {
    const nf = this.filter.subFilters.find(x => x.property === 'name');
    if (nf) {
      this.nameFilter = nf.value;
    }
  }

  apply(): void {
    const nameFilter = new PropertyFilter('name', 'contains', this.nameFilter);
    this.filter.addSubFilter(nameFilter);
    this.dialogRef.close(this.filter);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
