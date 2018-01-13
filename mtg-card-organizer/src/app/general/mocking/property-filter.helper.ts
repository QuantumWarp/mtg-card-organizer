import { PropertyFilter, PropertyFilterOperator } from '../grid/property-filter';

export class PropertyFilterHelper {
  static applyFilter<T>(propertyFilter: PropertyFilter, data: T[]): T[] {
    switch (propertyFilter.operator) {
      case PropertyFilterOperator.And:
        propertyFilter.subFilters.forEach(subFilter => {
          data = PropertyFilterHelper.applyFilter(subFilter, data);
        });
        break;
      case PropertyFilterOperator.Equals:
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
