import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { PropertyFilter } from '../../shared/filtering/property-filter';
import { PropertyFilterOperator } from '../../shared/filtering/property-filter-operator';
import { CardSet } from '../models/card-set';
import { Set } from '../models/set';
import { CardService } from '../services/card.service';
import { RapidEntryResult } from './rapid-entry-result';
import { Paging } from '../../shared/filtering/paging';
import { CardQuery } from '../models/card-query';

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

    const searchText = this.searchText;
    const cardQuery = new CardQuery({
      setIds: this.selectedSetIds,
      name: [ searchText ],
      paging: new Paging({
        limit: 11,
      })
    });

    this.cardService.query(cardQuery).subscribe(result => {
      this.rapidEntryResult.entryText = searchText;
      this.rapidEntryResult.selectedSetIds = this.selectedSetIds;
      this.rapidEntryResult.hasError = result.data.length !== 1;
      this.rapidEntryResult.results = result.data.length > 10 ? result.data.splice(0, 10) : result.data;

      if (!this.rapidEntryResult.hasError) {
        this.dialogRef.close();
      }
    });
  }

  optionClicked(cardSet: CardSet) {
    this.rapidEntryResult.entryText = cardSet.card.name;
    this.rapidEntryResult.selectedSetIds = new Array<number>();
    this.rapidEntryResult.hasError = false;
    this.rapidEntryResult.results = [ cardSet ];
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
