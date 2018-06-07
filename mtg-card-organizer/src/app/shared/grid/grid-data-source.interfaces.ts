import { Observable } from 'rxjs';

import { PageSortFilter } from '../filtering/page-sort-filter';
import { PagedData } from '../filtering/paged-data';

export interface DataService<T> {
  query(pageSortFilter: PageSortFilter): Observable<PagedData<T>>;
}
