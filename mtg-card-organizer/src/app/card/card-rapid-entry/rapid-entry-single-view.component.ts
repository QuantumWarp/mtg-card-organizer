import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { CardService } from '../services/card.service';
import { RapidEntryResult } from './rapid-entry-result';
import { Card } from '../models/card';
import { PropertyFilterOperator, PropertyFilter } from '../../general/grid/property-filter';
import { PageSortFilter } from '../../general/grid/page-sort-filter';

@Component({
  selector: 'app-rapid-entry-single-view',
  templateUrl: './rapid-entry-single-view.component.html',
  styleUrls: ['./card-rapid-entry.scss']
})
export class RapidEntrySingleViewComponent implements OnInit {
  @Input() rapidEntryResult: RapidEntryResult;
  @ViewChild('searchTextBox') searchTextBox: ElementRef;
  detailString: string;

  searchText: string;

  constructor(private cardService: CardService, private dialog: MatDialog, private dialogRef: MatDialogRef<RapidEntrySingleViewComponent>) { }

  ngOnInit() {
    this.dialogRef.afterOpen().subscribe(() => setTimeout(() => this.searchTextBox.nativeElement.focus(), 0));
    if (this.rapidEntryResult.hasError) {
      this.detailString = this.rapidEntryResult.results.length === 0 ? 'No matches found' : 'Multiple matches found';
    } else {
      this.detailString = 'Matched';
    }
  }

  search(keyEvent: KeyboardEvent): void {
    if (keyEvent.code !== 'Enter') {
      return;
    }

    const psFilter = new PageSortFilter();
    const searchText = this.searchText;
    this.searchText = '';
    psFilter.filter.addSubFilter(new PropertyFilter(
      'name',
      PropertyFilterOperator.Contains,
      searchText
    ));

    this.cardService.query(psFilter).subscribe(result => {
      this.rapidEntryResult.entryText = searchText;
      this.rapidEntryResult.filter = psFilter.filter;
      this.rapidEntryResult.hasError = result.data.length !== 1;
      this.rapidEntryResult.results = result.data.length > 10 ? new Card[0] : result.data;

      if (!this.rapidEntryResult.hasError) {
        this.dialogRef.close();
      }
    });
  }

  optionClicked(card: Card) {
    this.rapidEntryResult.entryText = card.name;
    this.rapidEntryResult.filter = PropertyFilter.blank();
    this.rapidEntryResult.hasError = false;
    this.rapidEntryResult.results = [ card ];
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
