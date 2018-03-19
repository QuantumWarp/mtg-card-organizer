import { HttpRequest, HttpResponse } from '@angular/common/http';
import { parse } from 'url';

import { PageSortFilter } from '../../general/filtering/page-sort-filter';
import { MockInterceptor } from '../../test/mocking/mock-interceptor';
import { PagedDataHelper } from '../../test/mocking/paged-data.helper';
import { cardDatabase } from './card-database.fixture';

export class CardMockInterceptor extends MockInterceptor {
  constructor() {
    super('api/cards');
  }

  chooseMethod(req: HttpRequest<any>): (req: HttpRequest<any>) => HttpResponse<any> {
    const url = parse(req.url, true);
    if (url.path.endsWith('cards')) {
      return this.cardQuery;
    }
  }

  cardQuery(req: HttpRequest<any>): HttpResponse<any> {
    const pageSortFilter = Object.assign(new PageSortFilter(), JSON.parse(req.body));
    const result = PagedDataHelper.createPagedData(pageSortFilter, cardDatabase);
    return new HttpResponse({
      status: 200,
      body: result
    });
  }
}
