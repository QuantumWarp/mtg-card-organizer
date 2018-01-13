import { Observable } from 'rxjs/Observable';

import { PageSortFilter } from './page-sort-filter';
import { PagedData } from './paged-data';

export interface DataService<T> {
  query(pageSortFilter: PageSortFilter): Observable<PagedData<T>>;
}
