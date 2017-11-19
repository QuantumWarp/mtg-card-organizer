import { PageSortFilter } from './page-sort-filter';
import { PagedData } from './paged-data';
import { Observable } from 'rxjs/Observable';

export interface GetAllData<T> {
  getAll(pageSortFilter: PageSortFilter): Observable<PagedData<T>>;
}
