import { QueryStringGenerator } from '../communication/query-string-generator.interface';
import { PropertyFilter } from './property-filter';
import { PropertySort } from './property-sort';

export class PageSortFilter implements QueryStringGenerator {
  filters = new Array<PropertyFilter>();
  sort: PropertySort = null;
  offset = 0;
  limit?: number = null;

  public constructor(init?: Partial<PageSortFilter>) {
    Object.assign(this, init);
  }

  addSubFilter(filter: PropertyFilter) {
    this.filters.push(filter);
  }

  toQueryString(): string {
    let queryString = 'offset=' + this.offset.toString();

    if (this.limit) {
      queryString = queryString + '&' + 'limit=' + this.limit.toString();
    }

    if (this.sort) {
      queryString = queryString + '&' + this.sort.toQueryString();
    }

    if (this.filters && this.filters.length) {
      queryString = queryString + '&' + 'filter=';
      this.filters.forEach(filter => {
        queryString = queryString + (queryString.endsWith('filter=') ? '' : ' and ') + filter.toQueryString();
      });
    }

    return queryString;
  }
}
