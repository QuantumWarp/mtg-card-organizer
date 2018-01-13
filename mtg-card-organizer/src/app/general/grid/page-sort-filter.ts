import { PropertyFilter } from './property-filter';
import { PropertySort } from './property-sort';

export class PageSortFilter {
  constructor(
    public filter = PropertyFilter.blank(),
    public sort: PropertySort = null,
    public page = 0,
    public pageSize?: number) { }
}
