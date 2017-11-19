import { PropertySort } from '../grid/property-sort';

export class PropertySortHelper {
  static applySort<T>(propertySort: PropertySort, data: T[]): T[] {
    return data.slice(0).sort((x1, x2) => {
      let value = x1[propertySort.field] > x2[propertySort.field] ? 1 : -1;
      if (x1[propertySort.field] === x2[propertySort.field]) {
        value = 0;
      }
      if (!propertySort.ascending) {
        value = value * -1;
      }
      return value;
    });
  }
}
