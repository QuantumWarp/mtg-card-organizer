import { Observable, of } from 'rxjs';

import { PagedData } from '../../shared/filtering/paged-data';
import { Paging } from '../../shared/filtering/paging';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { PagedDataHelper } from '../../test/mocking/paged-data.helper';
import { RapidEntryResult } from './rapid-entry-result';

export class RapidEntryResultStore implements DataService<RapidEntryResult> {
  rapidEntryResults = new Array<RapidEntryResult>();

  query(paging: Paging): Observable<PagedData<RapidEntryResult>> {
    return of(PagedDataHelper.createPagedData(paging, this.rapidEntryResults));
  }
}

