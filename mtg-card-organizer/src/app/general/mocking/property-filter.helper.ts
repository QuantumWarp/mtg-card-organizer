import { PropertyFilter } from '../grid/property-filter';

export class PropertyFilterHelper {
  static applyFilter<T>(propertyFilter: PropertyFilter, data: T[]): T[] {
    return data;
  }
}
