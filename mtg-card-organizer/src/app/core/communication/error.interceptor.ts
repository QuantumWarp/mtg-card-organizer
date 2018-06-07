
import { never, throwError,   Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { SnackNotificationService } from '../notifications/snack-notification.service';
import { SnackNotificationType } from '../notifications/snack-notification.type';
import { catchError } from 'rxjs/internal/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackNotificationService: SnackNotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err, caught) => {
      const handled = this.handleError(err);
      return handled ? never() : throwError(err);
    }));
  }

  private handleError(err: HttpErrorResponse): boolean {
    switch (err.status) {
      case 401:
        this.snackNotificationService.notify({
          type: SnackNotificationType.Error,
          message: 'Unauthorized',
        });
        return true;
      default:
        this.snackNotificationService.notify({
          type: SnackNotificationType.Error,
          message: 'Error contacting the server',
        });
        return false;
    }
  }
}
