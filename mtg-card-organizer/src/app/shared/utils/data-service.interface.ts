import { Observable } from 'rxjs';

import { PagedData } from '../filtering/paged-data';
import { QueryStringGenerator } from './query-string-generator.interface';



export interface DataService<T> {
  query(queryStringGenerator?: QueryStringGenerator): Observable<PagedData<T>>;
}
