import { HttpRequest, HttpResponse } from '@angular/common/http';
import { parse } from 'url';

import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { MockInterceptor } from '../../test/mocking/mock-interceptor';
import { PagedDataHelper } from '../../test/mocking/paged-data.helper';
import { cardDatabase } from './card-database.fixture';
import { collectionDatabase } from './collection-database.fixture';

export class CollectionMockInterceptor extends MockInterceptor {
  constructor() {
    super('api/collections');
  }

  chooseMethod(req: HttpRequest<any>): (req: HttpRequest<any>) => HttpResponse<any> {
    const url = parse(req.url, true);
    if (url.path.endsWith('collections')) {
      return this.collectionQuery;
    } else {
      return this.collectionCardQuery;
    }
  }

  collectionQuery(req: HttpRequest<any>): HttpResponse<any> {
    const pageSortFilter = Object.assign(new PageSortFilter(), JSON.parse(req.body));
    const result = PagedDataHelper.createPagedData(pageSortFilter, collectionDatabase);
    return new HttpResponse({
      status: 200,
      body: result
    });
  }

  collectionCardQuery(req: HttpRequest<any>): HttpResponse<any> {
    const pageSortFilter = Object.assign(new PageSortFilter(), JSON.parse(req.body));
    const result = PagedDataHelper.createPagedData(pageSortFilter, cardDatabase);
    return new HttpResponse({
      status: 200,
      body: result
    });
  }
}
