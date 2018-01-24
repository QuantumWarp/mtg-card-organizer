import { EventEmitter } from '@angular/core';

import { PropertyFilter } from './property-filter';

export class Filterer {
  filters = new Array<PropertyFilter>();
  filterChange = new EventEmitter<PropertyFilter[]>();

  applyFilters(filters: PropertyFilter[]) {
    this.filters = filters;
    this.filterChange.emit(this.filters);
  }
}
