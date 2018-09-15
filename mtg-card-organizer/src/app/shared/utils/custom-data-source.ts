import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

import { PagedData } from '../filtering/paged-data';
import { QueryStringGenerator } from './query-string-generator.interface';
import { DataService } from '../grid/grid-data-source.interfaces';

export class CustomDataSource<T> extends DataSource<T> {
  loading = false;
  noResults = true;
  currentQuery: QueryStringGenerator;

  private currentData: T[] = [];
  private currentResult = new PagedData<T>();

  private dataSubject: BehaviorSubject<T[]>;
  private resultSubject: BehaviorSubject<PagedData<T>>;

  constructor(public dataService: DataService<T>) {
    super();
    this.dataSubject = new BehaviorSubject<T[]>(this.currentData);
    this.resultSubject = new BehaviorSubject<PagedData<T>>(this.currentResult);
  }

  resetAndRefesh(): void {
    this.reloadData();
  }

  refresh(queryStringGenerator?: QueryStringGenerator): void {
    queryStringGenerator = queryStringGenerator ? queryStringGenerator : this.currentQuery;
    this.reloadData(queryStringGenerator);
  }

  private reloadData(queryStringGenerator?: QueryStringGenerator): void {
    this.loading = true;
    this.dataSubject.next([]);
    this.currentQuery = queryStringGenerator;
    this.dataService.query(queryStringGenerator).subscribe(result => {
      this.currentResult = result;
      this.currentData = result.data;
      this.noResults = this.currentData.length === 0;
      this.resultSubject.next(result);
      this.dataSubject.next(result.data);
      this.loading = false;
    });
  }

  connectToResult(): Observable<PagedData<T>> {
    return this.resultSubject;
  }

  connect(): Observable<T[]> {
    return this.dataSubject;
  }

  disconnect(): void {
  }
}
