import { Component, Input, ViewChild } from '@angular/core';

import { RapidEntryResultStore } from './rapid-entry-result.store';
import { MatSort, MatDialog } from '@angular/material';
import { RapidEntryResult } from './rapid-entry-result';
import { GridDataSource } from '../../general/grid/grid-data-source';
import { RapidEntrySingleViewComponent } from './rapid-entry-single-view.component';

@Component({
  selector: 'app-rapid-entry-result-grid',
  templateUrl: './rapid-entry-result-grid.component.html',
  styleUrls: ['./card-rapid-entry.scss']
})
export class RapidEntryResultGridComponent {
  @Input() rapidEntryResultDataSource: GridDataSource<RapidEntryResult>;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['text', 'hasError'];

  constructor(private dialog: MatDialog) { }

  singleEntryView(rapidEntryResult: RapidEntryResult) {
    const dialogRef = this.dialog.open(RapidEntrySingleViewComponent, { minWidth: '500px' });
    dialogRef.componentInstance.rapidEntryResult = rapidEntryResult;
  }
}
