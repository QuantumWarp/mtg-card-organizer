import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataService } from '../../general/grid/grid-data-source.interfaces';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { PagedData } from '../../general/grid/paged-data';
import { PagedDataHelper } from '../../general/mocking/paged-data.helper';
import { RapidEntryResult } from './rapid-entry-result';

export class RapidEntryResultStore implements DataService<RapidEntryResult> {
  rapidEntryResults = new Array<RapidEntryResult>();

  query(pageSortFilter: PageSortFilter): Observable<PagedData<RapidEntryResult>> {
    return Observable.of(PagedDataHelper.createPagedData(pageSortFilter, this.rapidEntryResults));
  }
}

