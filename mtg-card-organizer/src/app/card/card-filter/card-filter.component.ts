import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { PageSortFilter } from '../../general/filtering/page-sort-filter';
import { PropertyFilter } from '../../general/filtering/property-filter';
import { PropertyFilterOperator } from '../../general/filtering/property-filter-operator';
import { Set } from '../models/set';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card-filter.component.html'
})
export class CardFilterComponent implements OnInit {
  @Input() filters: PropertyFilter[];
  setsFormControl = new FormControl();

  sets: Array<Set>;

  nameFilter: string;

  constructor(private setService: SetService, public dialogRef: MatDialogRef<CardFilterComponent>) { }

  ngOnInit(): void {
    this.setService.query(new PageSortFilter()).subscribe(results => {
      this.sets = results.data;
    });

    const nf = this.filters.find(x => x.property === 'name');
    if (nf) {
      this.nameFilter = nf.value;
    }
  }

  apply(): void {
    const nameFilter = new PropertyFilter({
      property: 'name',
      operator: PropertyFilterOperator.Contains,
      value: this.nameFilter
    });
    this.filters.push(nameFilter);
    this.dialogRef.close(this.filters);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
