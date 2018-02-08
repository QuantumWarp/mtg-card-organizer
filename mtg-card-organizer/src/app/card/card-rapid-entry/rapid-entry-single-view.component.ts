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
  @ViewChild('searchTextBox') searchTextBox: ElementRef;

  @Input() rapidEntryResult: RapidEntryResult;
  @Input() sets: Set[];
  @Input() selectedSetIds: number[];

  detailString: string;
  searchText: string;

  constructor(
    private cardService: CardService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RapidEntrySingleViewComponent>) { }

  ngOnInit() {
    this.dialogRef.afterOpen().subscribe(() => setTimeout(() => this.searchTextBox.nativeElement.focus(), 0));
    this.selectedSetIds = this.rapidEntryResult.selectedSetIds;
    if (this.rapidEntryResult.hasError) {
      this.detailString = this.rapidEntryResult.results.length === 0 ? 'No matches found' :
        (this.rapidEntryResult.results.length > 10 ? 'Multiple matches found (Over 10)' : 'Multiple matches found');
    } else {
      this.detailString = 'Matched';
    }
  }

  setById(id: number): Set {
    return this.sets.find(x => x.id === id);
  }

  applySetFilter(selectedSetIds: number[]): void {
    this.selectedSetIds = selectedSetIds;
  }

  search(keyEvent: KeyboardEvent): void {
    if (keyEvent.code !== 'Enter') {
      return;
    }

    const psFilter = new PageSortFilter();
    psFilter.addSubFilter(new PropertyFilter({
      property: 'setId',
      operator: PropertyFilterOperator.IsContainedIn,
      value: this.selectedSetIds,
    }));
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
      this.rapidEntryResult.selectedSetIds = this.selectedSetIds;
      this.rapidEntryResult.hasError = result.data.length !== 1;
      this.rapidEntryResult.results = result.data.length > 10 ? result.data.splice(0, 10) : result.data;

      if (!this.rapidEntryResult.hasError) {
        this.dialogRef.close();
      }
    });
  }

  optionClicked(card: Card) {
    this.rapidEntryResult.entryText = card.name;
    this.rapidEntryResult.selectedSetIds = new Array<number>();
    this.rapidEntryResult.hasError = false;
    this.rapidEntryResult.results = [ card ];
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
