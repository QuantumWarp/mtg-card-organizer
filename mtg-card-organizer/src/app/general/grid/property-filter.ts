export class PropertyFilter {
  constructor(
    public property: string,
    public operator: string,
    public value: string,
    public subFilters = new Array<PropertyFilter>()) { }

  static blank(): PropertyFilter {
    return new PropertyFilter('', 'and', '');
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
