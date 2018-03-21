import 'rxjs/add/operator/do';

import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

export abstract class NetworkLogInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(environment.apiBaseUrl) && !req.url.startsWith(environment.identityServerUrl)) {
      return next.handle(req);
    }

    console.log(req);
    return next.handle(req).do(res => {
      if (res.type) {
        console.log(res);
      }
    });
  }
}
