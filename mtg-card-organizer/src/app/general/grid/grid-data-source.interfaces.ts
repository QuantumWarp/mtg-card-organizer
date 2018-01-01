import { PageSortFilter } from './page-sort-filter';
import { PagedData } from './paged-data';
import { Observable } from 'rxjs/Observable';

export interface QueryData<T> {
  query(pageSortFilter: PageSortFilter): Observable<PagedData<T>>;
}
