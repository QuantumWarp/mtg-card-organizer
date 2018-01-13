import { Component, Input, ViewChild } from '@angular/core';

import { RapidEntryResultStore } from './rapid-entry-result.store';
import { MatSort } from '@angular/material';
import { RapidEntryResult } from './rapid-entry-result';
import { GridDataSource } from '../../general/grid/grid-data-source';

@Component({
  selector: 'app-rapid-entry-result-grid',
  templateUrl: './rapid-entry-result-grid.component.html',
  styleUrls: ['../card.scss']
})
export class RapidEntryResultGridComponent {
  @Input() rapidEntryResultDataSource: GridDataSource<RapidEntryResult>;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['text', 'hasError'];
}
