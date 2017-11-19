import { MatSort } from '@angular/material';

export class PropertySort {

  constructor(public field: string, public ascending: boolean) { }

  static parseSort(matSort: MatSort): PropertySort {
    if (!matSort.direction) {
      return null;
    }
    return new PropertySort(
      matSort.active,
      matSort.direction === 'asc');
  }
}
