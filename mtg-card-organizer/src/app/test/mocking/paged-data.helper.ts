import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { PagedData } from '../../shared/filtering/paged-data';
import { PropertyFilterHelper } from './property-filter.helper';
import { PropertySortHelper } from './property-sort.helper';

export class PagedDataHelper {
  static createPagedData<T>(pageSortFilter: PageSortFilter, data: T[]): PagedData<T> {
    const totalCount = data.length;
    if (pageSortFilter.filters) {
      data = PropertyFilterHelper.applyFilters(pageSortFilter.filters, data);
    }
    if (pageSortFilter.sort) {
      data = PropertySortHelper.applySort(pageSortFilter.sort, data);
    }

    const startIndex = pageSortFilter.paging.offset;
    const endIndex = pageSortFilter.paging.limit || data.length - 1;
    const resultData = data.slice(startIndex, endIndex);

    const pagedData = new PagedData<T>();
    pagedData.data = resultData;
    pagedData.totalCount = totalCount;
    return pagedData;
  }
}
