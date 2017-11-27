import { PropertyFilter } from './property-filter';
import { EventEmitter } from '@angular/core';

export class Filterer {
  filter = PropertyFilter.blank();
  filterChange = new EventEmitter<PropertyFilter>();

  applyFilter(filter: PropertyFilter) {
    this.filter = filter;
    this.filterChange.emit(this.filter);
  }
}
