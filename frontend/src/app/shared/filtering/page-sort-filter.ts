import { QueryStringGenerator } from '../utils/query-string-generator.interface';
import { Paging } from './paging';
import { PropertyFilter } from './property-filter';
import { PropertySort } from './property-sort';

export class PageSortFilter implements QueryStringGenerator {
  static discriminator = 'PageSortFilter';
  discriminator = PageSortFilter.discriminator;

  paging: Paging;
  sort: PropertySort;
  filters = new Array<PropertyFilter>();

  static isPageSortFilter(obj: any): obj is PageSortFilter {
    return obj.discriminator === PageSortFilter.discriminator;
  }

  constructor(init?: Partial<PageSortFilter>) {
    Object.assign(this, init);
  }

  addSubFilters(filters: PropertyFilter[]) {
    filters.forEach(filter => this.addSubFilter(filter));
  }

  addSubFilter(filter: PropertyFilter) {
    this.filters.push(filter);
  }

  toQueryString(): string {
    let queryString = '';

    if (this.paging) {
      queryString = queryString + 'offset=' + this.paging.offset.toString();

      if (this.paging.limit) {
        queryString = this.addAnd(queryString);
        queryString = queryString + 'limit=' + this.paging.limit.toString();
      }
    }

    if (this.sort) {
      queryString = this.addAnd(queryString);
      queryString = queryString + this.sort.toQueryString();
    }

    if (this.filters && this.filters.length) {
      queryString = this.addAnd(queryString);
      queryString = queryString + 'filter=';
      this.filters.forEach(filter => {
        queryString = queryString + (queryString.endsWith('filter=') ? '' : ' and ') + filter.toQueryString();
      });
    }

    return queryString;
  }

  private addAnd(queryString: string): string {
    if (queryString !== '') {
      queryString = queryString + '&';
    }
    return queryString;
  }
}
