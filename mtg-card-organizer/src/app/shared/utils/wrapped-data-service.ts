import { Observable } from 'rxjs';

import { PagedData } from '../filtering/paged-data';
import { QueryStringGenerator } from './query-string-generator.interface';
import { map } from 'rxjs/internal/operators';
import { DataService } from '../grid/grid-data-source.interfaces';

export class WrappedDataService<TSource, TDestination> {

  constructor(
    public dataService: DataService<TSource>,
    public transform: (source: TSource) => TDestination,
  ) { }

  static construct<T>(dataService: DataService<T>): WrappedDataService<T, T> {
    return new WrappedDataService(dataService, x => x);
  }

  query(queryStringGenerator?: QueryStringGenerator): Observable<PagedData<TDestination>> {
    return this.dataService.query(queryStringGenerator).pipe(
      map(x => this.transformPagedData(x)),
    );
  }

  wrapMore<T>(extraTransform: (source: TDestination) => T): WrappedDataService<TSource, T> {
    return new WrappedDataService(this.dataService, x => extraTransform(this.transform(x)));
  }

  private transformPagedData(pagedData: PagedData<TSource>) {
    return new PagedData<TDestination>({
      data: pagedData.data.map(x => this.transform(x)),
      totalCount: pagedData.totalCount,
    });
  }
}
