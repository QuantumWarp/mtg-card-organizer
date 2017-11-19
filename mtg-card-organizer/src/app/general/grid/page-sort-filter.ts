import { PropertySort } from './property-sort';
import { PropertyFilter } from './property-filter';

export class PageSortFilter {
  sort: PropertySort;
  filter: PropertyFilter;
  page: number;
  pageSize: number;
}
