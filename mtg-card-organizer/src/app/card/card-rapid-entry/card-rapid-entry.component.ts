import { Component, Input, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatDialogRef } from '@angular/material';
import { CardFilterComponent } from '../card-filter/card-filter.component';
import { GridDataSource } from '../../general/grid/grid-data-source';
import { Card } from '../models/card';
import { PropertyFilter, PropertyFilterOperator } from '../../general/grid/property-filter';
import { Filterer } from '../../general/grid/filterer';
import { CardService } from '../services/card.service';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { RapidEntryResultStore } from './rapid-entry-result.store';
import { RapidEntryResultGridComponent } from './rapid-entry-result-grid.component';
import { RapidEntryResult } from './rapid-entry-result';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-card-rapid-entry',
  templateUrl: './card-rapid-entry.component.html',
  styleUrls: ['../card.scss']
})
export class CardRapidEntryComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('resultGrid') resultGrid: RapidEntryResultGridComponent;
  filterer = new Filterer();
  searchText: string;

  rapidEntryResultDataSource: GridDataSource<RapidEntryResult>;
  rapidEntryResultStore = new RapidEntryResultStore();

  constructor(private cardService: CardService, private dialog: MatDialog, private dialogRef: MatDialogRef<CardRapidEntryComponent>) { }

  ngOnInit(): void {
    this.rapidEntryResultDataSource = new GridDataSource<RapidEntryResult>(this.rapidEntryResultStore, this.paginator, this.resultGrid.sort, this.filterer);
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(CardFilterComponent, { disableClose: true });
    dialogRef.componentInstance.filter = this.filterer.filter.deepClone();
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterer.applyFilter(result);
      }
    });
  }

  search(keyEvent: KeyboardEvent): void {
    if (keyEvent.code !== 'Enter') {
      return;
    }

    const psFilter = new PageSortFilter();
    if (this.searchText === '') {
      this.rapidEntryResultStore.rapidEntryResults.splice(0, 0, this.rapidEntryResultStore.rapidEntryResults[0]);
      this.rapidEntryResultDataSource.reloadData();
      return;
    }
    const searchText = this.searchText;
    this.searchText = '';
    psFilter.filter.addSubFilter(new PropertyFilter(
      'name',
      PropertyFilterOperator.Contains,
      searchText
    ));

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

  close(): void {
    this.dialogRef.close();
  }

  apply(): void {
    this.dialogRef.close();
  }
}
