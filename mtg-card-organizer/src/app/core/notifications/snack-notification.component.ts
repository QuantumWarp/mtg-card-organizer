import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

import { SnackNotificationModel } from './snack-notification.model';
import { SnackNotificationType } from './snack-notification.type';

@Component({
  selector: 'mco-snack-notification',
  templateUrl: './snack-notification.component.html',
  styleUrls: ['./snack-notification.scss']
})
export class SnackNotificationComponent {
  snackNotificationType = SnackNotificationType;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public model: SnackNotificationModel) {}

  runAction(): void {
    if (this.model.action) {
      this.model.action();
    }
  }
}
