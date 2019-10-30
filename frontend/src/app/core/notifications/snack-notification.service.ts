import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { SnackNotificationComponent } from './snack-notification.component';
import { SnackNotificationModel } from './snack-notification.model';
import { SnackNotificationType } from './snack-notification.type';

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

  notifySuccess(message: string): void {
    const model = new SnackNotificationModel({
      type: SnackNotificationType.Success,
      message: message,
    });

    this.snackBar.openFromComponent(SnackNotificationComponent, {
      data: model,
      panelClass: ['mat-elevation-z4'],
      duration: 2000,
    });
  }

  notifyWarning(message: string): void {
    const model = new SnackNotificationModel({
      type: SnackNotificationType.Warning,
      message: message,
    });

    this.snackBar.openFromComponent(SnackNotificationComponent, {
      data: model,
      panelClass: ['mat-elevation-z4'],
      duration: 2000,
    });
  }
}
