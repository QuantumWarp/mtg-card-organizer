import { Component, Input, ViewChild } from '@angular/core';

import { RapidEntryResultStore } from './rapid-entry-result.store';
import { MatSort, MatDialog } from '@angular/material';
import { RapidEntryResult } from './rapid-entry-result';
import { GridDataSource } from '../../general/grid/grid-data-source';
import { RapidEntrySingleViewComponent } from './rapid-entry-single-view.component';
import { Filterer } from '../../general/filtering/filterer';
import { Set } from '../models/set';
import { PropertyFilter } from '../../general/filtering/property-filter';

@Component({
  selector: 'app-rapid-entry-result-grid',
  templateUrl: './rapid-entry-result-grid.component.html',
  styleUrls: ['./card-rapid-entry.scss']
})
export class RapidEntryResultGridComponent {
  @Input() rapidEntryResultDataSource: GridDataSource<RapidEntryResult>;
  @Input() sets: Map<number, Set>;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['text', 'hasError', 'deleteColumn'];

  constructor(private dialog: MatDialog) { }

  singleEntryView(rapidEntryResult: RapidEntryResult, filters: PropertyFilter[]) {
    const dialogRef = this.dialog.open(RapidEntrySingleViewComponent, { minWidth: '600px' });
    dialogRef.componentInstance.rapidEntryResult = rapidEntryResult;
    const filterer = new Filterer();
    filterer.filters = filters;
    dialogRef.componentInstance.filterer = filterer;
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
