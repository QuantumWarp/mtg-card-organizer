import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PageSortFilter } from '../../general/filtering/page-sort-filter';
import { PropertyFilter } from '../../general/filtering/property-filter';
import { PropertyFilterOperator } from '../../general/filtering/property-filter-operator';
import { Set } from '../models/set';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-set-selector',
  templateUrl: './set-selector.component.html'
})
export class SetSelectorComponent implements OnInit {
  @Output() setsSelected = new EventEmitter<Array<number>>();
  @Input() sets: Array<Set>;
  @Input() selectedSetIds = new Array<number>();

  constructor(private setService: SetService) { }

  ngOnInit(): void {
    if (!this.sets) {
      this.setService.query(new PageSortFilter()).subscribe(results => {
        this.sets = results.data.sort((x, y) => x.name > y.name ? 1 : -1);
      });
    }
  }

  setsChanged(): void {
    this.setsSelected.emit(this.selectedSetIds);
  }
}
