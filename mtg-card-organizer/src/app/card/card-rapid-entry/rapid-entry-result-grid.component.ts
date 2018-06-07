import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog, MatSort } from '@angular/material';

import { GridDataSource } from '../../shared/grid/grid-data-source';
import { Set } from '../models/set';
import { RapidEntryResult } from './rapid-entry-result';
import { RapidEntryResultStore } from './rapid-entry-result.store';
import { RapidEntrySingleViewComponent } from './rapid-entry-single-view.component';

@Component({
  selector: 'app-rapid-entry-result-grid',
  templateUrl: './rapid-entry-result-grid.component.html',
  styleUrls: ['./card-rapid-entry.scss']
})
export class RapidEntryResultGridComponent {
  @Input() rapidEntryResultDataSource: GridDataSource<RapidEntryResult>;
  @Input() sets: Set[];
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['text', 'set', 'foil', 'promo', 'deleteColumn'];

  constructor(private dialog: MatDialog) { }

  singleEntryView(rapidEntryResult: RapidEntryResult, selectedSetIds: number[]) {
    const dialogRef = this.dialog.open(RapidEntrySingleViewComponent, { minWidth: '600px' });
    dialogRef.componentInstance.rapidEntryResult = rapidEntryResult;
    dialogRef.componentInstance.sets = this.sets;
  }

  deleteEntry(rapidEntryResult: RapidEntryResult) {
    const index = (<RapidEntryResultStore>this.rapidEntryResultDataSource.dataService).rapidEntryResults.indexOf(rapidEntryResult);
    if (index > -1) {
      (<RapidEntryResultStore>this.rapidEntryResultDataSource.dataService).rapidEntryResults.splice(index, 1);
    }
    this.rapidEntryResultDataSource.reloadData();
  }
}
