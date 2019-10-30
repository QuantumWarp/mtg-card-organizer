import { AfterContentInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatPaginator, MatTable } from '@angular/material';

import { QueryStringGenerator } from '../../utils/query-string-generator.interface';
import { AbstractGridComponent } from '../abstract-grid.component';
import { GridDataSource } from '../grid-data-source';
import { DataService } from '../grid-data-source.interfaces';

@Component({
  selector: 'mco-basic-grid',
  templateUrl: './basic-grid.component.html',
  styleUrls: ['./basic-grid.component.scss'],
})
export class BasicGridComponent<T> extends AbstractGridComponent implements OnChanges, AfterContentInit {
  @Output() rowSelected = new EventEmitter<T>();

  @Input() service: DataService<T>;
  @Input() filter: QueryStringGenerator;
  @Input() columns: string[];

  @ViewChild(MatTable) table: MatTable<T>;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;

  dataSource: GridDataSource<T>;

  get displayedColumns(): string[] {
    return this.columns;
  }

  ngOnChanges(): void {
    if (!this.dataSource) {
      this.dataSource = new GridDataSource(this.service, this.matPaginator, this.matSort);
    }

    this.dataSource.refresh(this.filter);
  }

  ngAfterContentInit() {
    if (!this.columns) {
      this.columns = this.columnDefs.map(x => x.name);
    }

    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
  }

  refreshDataSource(): void {
    this.dataSource.refresh();
  }
}
