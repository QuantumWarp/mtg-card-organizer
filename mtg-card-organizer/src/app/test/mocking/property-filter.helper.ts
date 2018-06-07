import { PropertyFilter } from '../../shared/filtering/property-filter';
import { PropertyFilterOperator } from '../../shared/filtering/property-filter-operator';

export class PropertyFilterHelper {
  static applyFilters<T>(propertyFilters: PropertyFilter[], data: T[]): T[] {
    propertyFilters.forEach(propertyFilter => {
      data = this.applyFilter(propertyFilter, data);
    });
    return data;
  }

  static applyFilter<T>(propertyFilter: PropertyFilter, data: T[]): T[] {
    switch (propertyFilter.operator) {
      case PropertyFilterOperator.IsEqual:
        // tslint:disable-next-line:triple-equals
        data = data.filter(elem => elem[propertyFilter.property] == propertyFilter.value);
        break;
      case PropertyFilterOperator.Contains:
        data = data.filter(elem => (<Object>elem[propertyFilter.property]).toString().toLowerCase().includes(propertyFilter.value.toLowerCase()));
        break;

    }
    return data;
  }
}
