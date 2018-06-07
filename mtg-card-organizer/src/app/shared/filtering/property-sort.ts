import { MatSort } from '@angular/material';

import { QueryStringGenerator } from '../utils/query-string-generator.interface';

export class PropertySort implements QueryStringGenerator {
  field: string;
  ascending: boolean;

  public constructor(init?: Partial<PropertySort>) {
    Object.assign(this, init);
  }

  static parseSort(matSort: MatSort): PropertySort {
    if (!matSort.direction) {
      return null;
    }
    return new PropertySort({
      field: matSort.active,
      ascending: matSort.direction === 'asc'
    });
  }

  toQueryString(): string {
    return 'sort=' + (!this.ascending ? '-' : '') + this.field;
  }
}
