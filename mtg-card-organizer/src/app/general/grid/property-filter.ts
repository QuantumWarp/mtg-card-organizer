export class PropertyFilter {
  constructor(
    public property: string,
    public operator: PropertyFilterOperator,
    public value: any,
    public subFilters = new Array<PropertyFilter>()) { }

  static blank(): PropertyFilter {
    return new PropertyFilter('', PropertyFilterOperator.And, '');
  }

  addSubFilter(filter: PropertyFilter) {
    this.subFilters.push(filter);
  }

  deepClone(): PropertyFilter {
    const clone = new PropertyFilter(this.property, this.operator, this.value);
    this.subFilters.forEach(subFilter => {
      clone.addSubFilter(subFilter.deepClone());
    });
    return clone;
  }
}

export enum PropertyFilterOperator {
  And,
  Equals,
  Contains,
}
