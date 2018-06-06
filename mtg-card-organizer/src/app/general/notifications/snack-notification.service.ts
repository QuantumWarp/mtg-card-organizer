import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { SnackNotificationComponent } from './snack-notification.component';
import { SnackNotificationModel } from './snack-notification.model';

@Injectable()
export class SnackNotificationService {
  constructor(private snackBar: MatSnackBar) { }

  notify(model: SnackNotificationModel, duration = 2000): void {
    this.snackBar.openFromComponent(SnackNotificationComponent, {
      data: model,
      panelClass: ['mat-elevation-z4'],
      duration: duration,
    });
  }
}
