import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import * as _ from 'lodash';

import { Filterer } from '../../general/filtering/filterer';
import { PageSortFilter } from '../../general/filtering/page-sort-filter';
import { PropertyFilter } from '../../general/filtering/property-filter';
import { PropertyFilterOperator } from '../../general/filtering/property-filter-operator';
import { CardFilterComponent } from '../card-filter/card-filter.component';
import { Card } from '../models/card';
import { Set } from '../models/set';
import { CardService } from '../services/card.service';
import { SetService } from '../services/set.service';
import { RapidEntryResult } from './rapid-entry-result';

@Component({
  selector: 'app-rapid-entry-single-view',
  templateUrl: './rapid-entry-single-view.component.html',
  styleUrls: ['./card-rapid-entry.scss']
})
export class RapidEntrySingleViewComponent implements OnInit {
  @Input() rapidEntryResult: RapidEntryResult;
  @Input() filterer: Filterer;
  @ViewChild('searchTextBox') searchTextBox: ElementRef;
  @Input() sets: Map<number, Set>;
  detailString: string;

  searchText: string;

  constructor(
    private cardService: CardService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RapidEntrySingleViewComponent>) { }

  ngOnInit() {
    this.dialogRef.afterOpen().subscribe(() => setTimeout(() => this.searchTextBox.nativeElement.focus(), 0));
    if (this.rapidEntryResult.hasError) {
      this.detailString = this.rapidEntryResult.results.length === 0 ? 'No matches found' :
        (this.rapidEntryResult.results.length > 10 ? 'Multiple matches found (Over 10)' : 'Multiple matches found');
    } else {
      this.detailString = 'Matched';
    }
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(CardFilterComponent, { disableClose: true, minWidth: '300px' });
    dialogRef.componentInstance.filters = this.filterer.filters.map(x => _.deepClone(x));
    dialogRef.afterClosed().subscribe(filters => {
      if (filters) {
        this.filterer.applyFilters(filters);
      }
    });
  }

  search(keyEvent: KeyboardEvent): void {
    if (keyEvent.code !== 'Enter') {
      return;
    }

    const psFilter = new PageSortFilter();
    psFilter.addSubFilters(this.filterer.filters);
    const searchText = this.searchText;
    this.searchText = '';
    psFilter.addSubFilter(new PropertyFilter({
      property: 'name',
      operator: PropertyFilterOperator.Contains,
      value: searchText,
    }));
    psFilter.limit = 11;

    this.cardService.query(psFilter).subscribe(result => {
      this.rapidEntryResult.entryText = searchText;
      this.rapidEntryResult.filters = psFilter.filters;
      this.rapidEntryResult.hasError = result.data.length !== 1;
      this.rapidEntryResult.results = result.data.length > 10 ? result.data.splice(0, 10) : result.data;

      if (!this.rapidEntryResult.hasError) {
        this.dialogRef.close();
      }
    });
  }

  optionClicked(card: Card) {
    this.rapidEntryResult.entryText = card.name;
    this.rapidEntryResult.filters = new Array<PropertyFilter>();
    this.rapidEntryResult.hasError = false;
    this.rapidEntryResult.results = [ card ];
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
