import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';

import { Filterer } from '../../general/filtering/filterer';
import { PropertyFilter } from '../../general/filtering/property-filter';
import { PropertyFilterOperator } from '../../general/filtering/property-filter-operator';
import { GridDataSource } from '../../general/grid/grid-data-source';
import { CardFilterComponent } from '../card-filter/card-filter.component';
import { Card } from '../models/card';

@Component({
  selector: 'app-card-search-bar',
  templateUrl: './card-search-bar.component.html',
  styleUrls: ['../card.scss']
})
export class CardSearchBarComponent implements OnInit {
  @Input() cardDataSource: GridDataSource<Card>;
  @Input() filterer: Filterer;
  nameFilterString: string;
  otherFilters: PropertyFilter[];
  nameFilterControl = new FormControl();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.nameFilterControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
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
    const filters = new Array<PropertyFilter>();
    if (this.nameFilterString) {
      const nameFilter = new PropertyFilter({
        property: 'name',
        operator: PropertyFilterOperator.Contains,
        value: this.nameFilterString,
      });
      filters.push(nameFilter);
    }
    filters.push(...this.otherFilters);
    this.filterer.applyFilters(filters);
  }
}
