import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

import { Filterer } from '../../shared/filtering/filterer';
import { PropertyFilter } from '../../shared/filtering/property-filter';
import { PropertyFilterOperator } from '../../shared/filtering/property-filter-operator';
import { GridDataSource } from '../../shared/grid/grid-data-source';
import { CardFilterComponent } from '../card-filter/card-filter.component';
import { Card } from '../models/card';
import { CardQuery } from '../models/card-query';

@Component({
  selector: 'app-card-search-bar',
  templateUrl: './card-search-bar.component.html',
  styleUrls: ['../card.scss']
})
export class CardSearchBarComponent implements OnInit {
  @Output() newCardQuery = new EventEmitter<CardQuery>();

  @Input() cardDataSource: GridDataSource<Card>;
  @Input() filterer: Filterer;
  nameFilterString: string;
  otherFilters: PropertyFilter[];
  nameFilterControl = new FormControl();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.nameFilterControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged())
      .subscribe(value => this.updateFilters());
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(CardFilterComponent, { disableClose: true });
    dialogRef.componentInstance.filters = this.filterer.filters.map(x => _.cloneDeep(x));
    dialogRef.afterClosed().subscribe(results => {
      if (results) {
        this.otherFilters = results;
        this.updateFilters();
      }
    });
  }

  private updateFilters(): void {
    const filter = new CardQuery({
      name: this.nameFilterString,
    });
    this.newCardQuery.emit(filter);
  }
}
