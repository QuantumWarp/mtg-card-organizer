import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog, MatDialogRef, MatPaginator } from '@angular/material';
import * as _ from 'lodash';

import { Filterer } from '../../general/filtering/filterer';
import { PageSortFilter } from '../../general/filtering/page-sort-filter';
import { PropertyFilter } from '../../general/filtering/property-filter';
import { PropertyFilterOperator } from '../../general/filtering/property-filter-operator';
import { GridDataSource } from '../../general/grid/grid-data-source';
import { CardFilterComponent } from '../card-filter/card-filter.component';
import { Set } from '../models/set';
import { CardService } from '../services/card.service';
import { SetService } from '../services/set.service';
import { RapidEntryResult } from './rapid-entry-result';
import { RapidEntryResultGridComponent } from './rapid-entry-result-grid.component';
import { RapidEntryResultStore } from './rapid-entry-result.store';

@Component({
  selector: 'app-card-rapid-entry',
  templateUrl: './card-rapid-entry.component.html',
  styleUrls: ['./card-rapid-entry.scss']
})
export class CardRapidEntryComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('resultGrid') resultGrid: RapidEntryResultGridComponent;
  @ViewChild('searchTextBox') searchTextBox: ElementRef;
  sets: Map<number, Set>;
  filterer = new Filterer();

  searchText: string;
  lastSearchText: string;

  rapidEntryResultDataSource: GridDataSource<RapidEntryResult>;
  rapidEntryResultStore = new RapidEntryResultStore();

  constructor(
    private setService: SetService,
    private cardService: CardService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CardRapidEntryComponent>) { }

  ngOnInit(): void {
    this.setService.query().subscribe(results => {
      this.sets = new Map(results.data.map(x => [ x.id, x ] as [ number, Set ]));
    });

    this.dialogRef.afterOpen().subscribe(() => setTimeout(() => this.searchTextBox.nativeElement.focus(), 0));
    this.rapidEntryResultDataSource = new GridDataSource<RapidEntryResult>(this.rapidEntryResultStore, this.paginator, this.resultGrid.sort, this.filterer);
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

  openLatestError(): void {
    const firstError = this.rapidEntryResultStore.rapidEntryResults.find(x => x.hasError);
    if (firstError) {
      this.resultGrid.singleEntryView(firstError, this.filterer.filters);
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

    const psFilter = new PageSortFilter();
    psFilter.addSubFilters(this.filterer.filters);
    psFilter.addSubFilter(new PropertyFilter({
      property: 'name',
      operator: PropertyFilterOperator.Contains,
      value: this.searchText === '' ? this.lastSearchText : this.searchText,
    }));
    psFilter.limit = 11;

    if (this.searchText === '') {
      this.triggerSearch(this.lastSearchText, psFilter);
      return;
    }

    this.triggerSearch(this.searchText, psFilter);

    this.lastSearchText = this.searchText;
    this.searchText = '';
  }

  private triggerSearch(searchText: string, psFilter: PageSortFilter): void {
    this.cardService.query(psFilter).subscribe(result => {
      const rpr: RapidEntryResult = {
        entryText: searchText,
        filters: psFilter.filters,
        hasError: result.data.length !== 1,
        results: result.data
       };
       this.rapidEntryResultStore.rapidEntryResults.splice(0, 0, rpr);
       this.rapidEntryResultDataSource.reloadData();
    });
  }
}
