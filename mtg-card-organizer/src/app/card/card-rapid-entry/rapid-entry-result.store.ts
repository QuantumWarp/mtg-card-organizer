import { Observable, of } from 'rxjs';

import { PageSortFilter } from '../../general/filtering/page-sort-filter';
import { PagedData } from '../../general/filtering/paged-data';
import { DataService } from '../../general/grid/grid-data-source.interfaces';
import { PagedDataHelper } from '../../test/mocking/paged-data.helper';
import { RapidEntryResult } from './rapid-entry-result';

export class RapidEntryResultStore implements DataService<RapidEntryResult> {
  rapidEntryResults = new Array<RapidEntryResult>();

  query(pageSortFilter: PageSortFilter): Observable<PagedData<RapidEntryResult>> {
    return of(PagedDataHelper.createPagedData(pageSortFilter, this.rapidEntryResults));
  }
}

