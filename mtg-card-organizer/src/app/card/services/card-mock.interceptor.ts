import { HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MockInterceptor } from '../../general/mocking/mock-interceptor';
import { parse } from 'url';
import { PagedData } from '../../general/grid/paged-data';
import { PagedDataHelper } from '../../general/mocking/paged-data.helper';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
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
