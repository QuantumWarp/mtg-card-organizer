import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';

import { environment } from '../../../environments/environment';

export abstract class NetworkLogInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(environment.apiBaseUrl)) {
      return next.handle(req);
    }

    console.log(req);
    return next.handle(req).pipe(tap(res => {
      if (res.type) {
        console.log(res);
      }
    }));
  }
}
