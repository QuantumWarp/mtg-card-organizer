import { Observable, of } from 'rxjs';

import { PagedDataHelper } from '../filtering/local/paged-data.helper';
import { PropertyFilterHelper } from '../filtering/local/property-filter.helper';
import { PropertySortHelper } from '../filtering/local/property-sort.helper';
import { PageSortFilter } from '../filtering/page-sort-filter';
import { PagedData } from '../filtering/paged-data';
import { Paging } from '../filtering/paging';
import { DataService } from '../grid/grid-data-source.interfaces';
import { QueryStringGenerator } from './query-string-generator.interface';

export class LocalDataService<T> extends DataService<T> {
  constructor(private data: T[]) {
    super();
  }

  updateData(data: T[]) {
    this.data = data;
    this.dataChanged.emit();
  }

  query(queryStringGenerator?: QueryStringGenerator): Observable<PagedData<T>> {
    let resultData = this.data;

    const paging = queryStringGenerator && (<any>queryStringGenerator).paging ? (<any>queryStringGenerator).paging : new Paging();

    if (PageSortFilter.isPageSortFilter(queryStringGenerator)) {
      resultData = PropertyFilterHelper.applyFilters(queryStringGenerator.filters, resultData);
      resultData = PropertySortHelper.applySort(queryStringGenerator.sort, resultData);
    }

    const pagedResults = PagedDataHelper.createPagedData(paging, resultData);
    return of(pagedResults);
  }
}
