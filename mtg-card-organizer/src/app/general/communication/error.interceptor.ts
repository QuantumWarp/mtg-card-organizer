import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/never';
import { SnackNotificationService } from '../notifications/snack-notification.service';
import { SnackNotificationType } from '../notifications/snack-notification.type';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackNotificationService: SnackNotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch((err, caught) => {
      const handled = this.handleError(err);
      return handled ? Observable.never() : Observable.throw(err);
    });
  }

  private handleError(err: HttpErrorResponse): boolean {
    this.snackNotificationService.notify({
      type: SnackNotificationType.Error,
      message: 'Error contacting the server',
    });
    return false;
  }
}
