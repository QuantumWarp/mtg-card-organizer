import { SnackNotificationType } from './snack-notification.type';

export interface SnackNotificationModel {
  type: SnackNotificationType;
  message: string;
  action?: () => void;
}
