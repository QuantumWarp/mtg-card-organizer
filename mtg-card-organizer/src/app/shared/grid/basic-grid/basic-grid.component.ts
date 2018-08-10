import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatTable } from '@angular/material';

import { DataService } from '../../utils/data-service.interface';
import { AbstractGridComponent } from '../abstract-grid.component.html';
import { GridDataSource } from '../grid-data-source';
import { QueryStringGenerator } from '../../utils/query-string-generator.interface';

@Component({
  selector: 'app-basic-grid',
  templateUrl: './basic-grid.component.html',
  styleUrls: ['./basic-grid.component.scss'],
})
export class BasicGridComponent<T> extends AbstractGridComponent<T> implements OnInit, AfterContentInit {
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

  ngOnInit(): void {
    this.dataSource = new GridDataSource(this.service, this.matPaginator, this.matSort);
    this.dataSource.refreshGrid(this.filter);
  }

  ngAfterContentInit() {
    if (!this.columns) {
      this.columns = this.columnDefs.map(x => x.name);
    }

    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
  }
}
