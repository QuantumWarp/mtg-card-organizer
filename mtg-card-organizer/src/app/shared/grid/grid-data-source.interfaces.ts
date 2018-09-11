import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { PagedData } from '../filtering/paged-data';
import { QueryStringGenerator } from '../utils/query-string-generator.interface';

export abstract class DataService<T> {
  dataChanged = new EventEmitter();
  abstract query(queryStringGenerator?: QueryStringGenerator): Observable<PagedData<T>>;
}
