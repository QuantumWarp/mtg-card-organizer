import { SnackNotificationType } from './snack-notification.type';

export class SnackNotificationModel {
  type: SnackNotificationType;
  message: string;
  action?: () => void;

  constructor(init?: Partial<SnackNotificationModel>) {
    Object.assign(this, init);
  }
}
