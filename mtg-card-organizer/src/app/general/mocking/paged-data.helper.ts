import { PageSortFilter } from '../grid/page-sort-filter';
import { PropertySortHelper } from './property-sort.helper';
import { PagedData } from '../grid/paged-data';
import { PropertyFilterHelper } from './property-filter.helper';

export class PagedDataHelper {
  static createPagedData<T>(pageSortFilter: PageSortFilter, data: T[]): PagedData<T> {
    const totalCount = data.length;
    if (pageSortFilter.filter) {
      data = PropertyFilterHelper.applyFilter(pageSortFilter.filter, data);
    }
    if (pageSortFilter.sort) {
      data = PropertySortHelper.applySort(pageSortFilter.sort, data);
    }

    const startIndex = pageSortFilter.page * pageSortFilter.pageSize;
    const endIndex = startIndex + pageSortFilter.pageSize;
    const resultData = data.slice(startIndex, endIndex);

    const pagedData = new PagedData<T>();
    pagedData.data = resultData;
    pagedData.totalCount = totalCount;
    return pagedData;
  }
}
