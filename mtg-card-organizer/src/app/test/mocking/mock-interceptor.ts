import 'rxjs/add/observable/of';

import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { Observable } from 'rxjs/Observable';
import { parse } from 'url';

import { environment } from '../../../environments/environment';

export abstract class MockInterceptor implements HttpInterceptor {
  constructor(private baseArea: string) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = parse(req.url, true);
    if ((environment.testSettings && !environment.testSettings.mockApi) || !url.path.startsWith('/' + this.baseArea)) {
      return next.handle(req);
    }

    let method = this.chooseMethod(req);
    if (!method) {
      method = this.methodNotFound;
    }

    return Observable.of(method(req));
  }

  abstract chooseMethod(req: HttpRequest<any>): (req: HttpRequest<any>) => HttpResponse<any>;

  private methodNotFound(req: HttpRequest<any>): HttpResponse<any> {
    return new HttpResponse({
      status: 404,
      statusText: 'Not Found'
    });
  }
}
