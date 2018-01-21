import { Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog, MatDialogRef, MatPaginator } from '@angular/material';

import { Filterer } from '../../general/grid/filterer';
import { GridDataSource } from '../../general/grid/grid-data-source';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { PropertyFilter, PropertyFilterOperator } from '../../general/grid/property-filter';
import { CardFilterComponent } from '../card-filter/card-filter.component';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { RapidEntryResult } from './rapid-entry-result';
import { RapidEntryResultGridComponent } from './rapid-entry-result-grid.component';
import { RapidEntryResultStore } from './rapid-entry-result.store';
import { PagedDataHelper } from '../../general/mocking/paged-data.helper';

@Component({
  selector: 'app-card-rapid-entry',
  templateUrl: './card-rapid-entry.component.html',
  styleUrls: ['./card-rapid-entry.scss']
})
export class CardRapidEntryComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('resultGrid') resultGrid: RapidEntryResultGridComponent;
  @ViewChild('searchTextBox') searchTextBox: ElementRef;
  filterer = new Filterer();

  searchText: string;
  lastSearchText: string;

  rapidEntryResultDataSource: GridDataSource<RapidEntryResult>;
  rapidEntryResultStore = new RapidEntryResultStore();

  constructor(private cardService: CardService, private dialog: MatDialog, private dialogRef: MatDialogRef<CardRapidEntryComponent>) { }

  ngOnInit(): void {
    this.dialogRef.afterOpen().subscribe(() => setTimeout(() => this.searchTextBox.nativeElement.focus(), 0));
    this.rapidEntryResultDataSource = new GridDataSource<RapidEntryResult>(this.rapidEntryResultStore, this.paginator, this.resultGrid.sort, this.filterer);
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(CardFilterComponent, { disableClose: true, minWidth: '300px' });
    dialogRef.componentInstance.filter = this.filterer.filter.deepClone();
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterer.applyFilter(result);
      }
    });
  }

  openLatestError(): void {
    const firstError = this.rapidEntryResultStore.rapidEntryResults.find(x => x.hasError);
    if (firstError) {
      this.resultGrid.singleEntryView(firstError);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  apply(): void {
    if (!this.rapidEntryResultStore.rapidEntryResults.find(x => x.hasError)) {
      this.dialogRef.close(this.rapidEntryResultStore.rapidEntryResults.map(x => x.results[0].cardId));
    } else {
      this.openLatestError();
    }
  }

  search(keyEvent: KeyboardEvent): void {
    switch (keyEvent.code) {
      case 'ArrowDown':
        this.openLatestError();
        return;
      case 'Enter': break;
      default: return;
    }

    if (this.searchText === '') {
      this.triggerSearch(this.lastSearchText, new PageSortFilter());
      return;
    }

    const psFilter = new PageSortFilter();
    psFilter.filter.addSubFilter(new PropertyFilter(
      'name',
      PropertyFilterOperator.Contains,
      this.searchText,
    ));

    this.triggerSearch(this.searchText, psFilter);

    this.lastSearchText = this.searchText;
    this.searchText = '';
  }

  private triggerSearch(searchText: string, psFilter: PageSortFilter): void {
    this.cardService.query(psFilter).subscribe(result => {
      const rpr: RapidEntryResult = {
        entryText: searchText,
        filter: psFilter.filter,
        hasError: result.data.length !== 1,
        results: result.data.length > 10 ? new Card[0] : result.data
       };
       this.rapidEntryResultStore.rapidEntryResults.splice(0, 0, rpr);
       this.rapidEntryResultDataSource.reloadData();
    });
  }
}
