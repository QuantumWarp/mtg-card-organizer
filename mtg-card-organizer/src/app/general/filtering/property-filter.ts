import { QueryStringGenerator } from '../communication/query-string-generator.interface';
import { PropertyFilterOperator, PropertyFilterOperatorExtensions } from './property-filter-operator';

export class PropertyFilter implements QueryStringGenerator {
  property: string;
  operator: PropertyFilterOperator;
  value: any;

  public constructor(init?: Partial<PropertyFilter>) {
    Object.assign(this, init);
  }

  toQueryString(): string {
    return this.property + ' ' + PropertyFilterOperatorExtensions.toQueryStringOperator(this.operator) + ' ' + '\'' + this.value + '\'';
  }
}
