import { QueryStringGenerator } from '../utils/query-string-generator.interface';
import { PropertyFilterOperator, PropertyFilterOperatorExtensions } from './property-filter-operator';

export class PropertyFilter implements QueryStringGenerator {
  property: string;
  operator: PropertyFilterOperator;
  value: any;

  constructor(init?: Partial<PropertyFilter>) {
    Object.assign(this, init);
  }

  toQueryString(): string {
    return this.property + ' ' + PropertyFilterOperatorExtensions.toQueryStringOperator(this.operator) + ' ' + this.valueQueryString();
  }

  private valueQueryString(): string {
    switch (this.operator) {
      case PropertyFilterOperator.Contains:
      case PropertyFilterOperator.IsEqual:
        return '\'' + this.value + '\'';
      case PropertyFilterOperator.IsContainedIn:
        if (this.value instanceof Array) {
          return '[\'' + this.value.join('\',\'') + '\']';
        }
    }
  }
}
