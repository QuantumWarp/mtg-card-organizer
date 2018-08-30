import { Observable, of } from 'rxjs';

import { PagedData } from '../filtering/paged-data';
import { QueryStringGenerator } from './query-string-generator.interface';
import { DataService } from '../grid/grid-data-source.interfaces';
import { PagedDataHelper } from '../filtering/local/paged-data.helper';
import { PageSortFilter } from '../filtering/page-sort-filter';
import { PropertySortHelper } from '../filtering/local/property-sort.helper';
import { PropertyFilterHelper } from '../filtering/local/property-filter.helper';
import { Paging } from '../filtering/paging';

export class LocalDataService<T> implements DataService<T> {

  constructor(private data: T[]) { }

  updateData(data: T[]) {
    this.data = data;
  }

  query(queryStringGenerator?: QueryStringGenerator): Observable<PagedData<T>> {
    let resultData = this.data;
    let paging = new Paging();
    if (PageSortFilter.isPageSortFilter(queryStringGenerator)) {
      resultData = PropertyFilterHelper.applyFilters(queryStringGenerator.filters, resultData);
      resultData = PropertySortHelper.applySort(queryStringGenerator.sort, resultData);
      paging = queryStringGenerator.paging;
    }

    const pagedResults = PagedDataHelper.createPagedData(paging, resultData);
    return of(pagedResults);
  }
}
