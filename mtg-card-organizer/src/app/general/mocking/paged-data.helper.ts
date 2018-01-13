import { PageSortFilter } from '../grid/page-sort-filter';
import { PagedData } from '../grid/paged-data';
import { PropertyFilterHelper } from './property-filter.helper';
import { PropertySortHelper } from './property-sort.helper';

export class PagedDataHelper {
  static createPagedData<T>(pageSortFilter: PageSortFilter, data: T[]): PagedData<T> {
    const totalCount = data.length;
    if (pageSortFilter.filter) {
      data = PropertyFilterHelper.applyFilter(pageSortFilter.filter, data);
    }
    if (pageSortFilter.sort) {
      data = PropertySortHelper.applySort(pageSortFilter.sort, data);
    }

    const page = pageSortFilter.page != null ? pageSortFilter.page : 0;
    const pageSize = pageSortFilter.pageSize != null ? pageSortFilter.pageSize : data.length;

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const resultData = data.slice(startIndex, endIndex);

    const pagedData = new PagedData<T>();
    pagedData.data = resultData;
    pagedData.totalCount = totalCount;
    return pagedData;
  }
}
