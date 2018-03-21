import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SnackNotificationModel } from './snack-notification.model';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { SnackNotificationType } from './snack-notification.type';

@Component({
  selector: 'app-snack-notification',
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
