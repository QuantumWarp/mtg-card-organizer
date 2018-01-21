import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { PropertyFilter, PropertyFilterOperator } from '../../general/grid/property-filter';
import { Set } from '../models/set';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card-filter.component.html'
})
export class CardFilterComponent implements OnInit {
  @Input() filter: PropertyFilter;
  setsFormControl = new FormControl();

  sets: Array<Set>;

  nameFilter: string;

  constructor(private setService: SetService, public dialogRef: MatDialogRef<CardFilterComponent>) { }

  ngOnInit(): void {
    this.setService.query(new PageSortFilter()).subscribe(results => {
      this.sets = results.data;
    });

    const nf = this.filter.subFilters.find(x => x.property === 'name');
    if (nf) {
      this.nameFilter = nf.value;
    }
  }

  apply(): void {
    const nameFilter = new PropertyFilter('name', PropertyFilterOperator.Contains, this.nameFilter);
    this.filter.addSubFilter(nameFilter);
    this.dialogRef.close(this.filter);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
