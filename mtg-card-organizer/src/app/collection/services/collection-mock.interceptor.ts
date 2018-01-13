import { HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MockInterceptor } from '../../general/mocking/mock-interceptor';
import { parse } from 'url';
import { PagedData } from '../../general/grid/paged-data';
import { PagedDataHelper } from '../../general/mocking/paged-data.helper';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { collectionDatabase } from './collection-database.fixture';
import { cardDatabase } from '../../card/services/card-database.fixture';

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
