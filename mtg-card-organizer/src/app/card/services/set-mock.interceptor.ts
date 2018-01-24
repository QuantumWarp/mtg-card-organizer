import { HttpRequest, HttpResponse } from '@angular/common/http';
import { parse } from 'url';

import { PageSortFilter } from '../../general/filtering/page-sort-filter';
import { MockInterceptor } from '../../test/mocking/mock-interceptor';
import { PagedDataHelper } from '../../test/mocking/paged-data.helper';
import { setDatabase } from './set-database.fixture';

export class SetMockInterceptor extends MockInterceptor {
  constructor() {
    super('api/sets');
  }

  chooseMethod(req: HttpRequest<any>): (req: HttpRequest<any>) => HttpResponse<any> {
    const url = parse(req.url, true);
    if (url.path.endsWith('sets')) {
      return this.setQuery;
    }
  }

  setQuery(req: HttpRequest<any>): HttpResponse<any> {
    const pageSortFilter = Object.assign(new PageSortFilter(), JSON.parse(req.body));
    const result = PagedDataHelper.createPagedData(pageSortFilter, setDatabase);
    return new HttpResponse({
      status: 200,
      body: result
    });
  }
}
