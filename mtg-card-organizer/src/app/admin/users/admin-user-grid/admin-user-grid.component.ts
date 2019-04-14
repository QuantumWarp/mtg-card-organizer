import { Component, Input, ViewChild } from '@angular/core';

import { AbstractGridComponent } from '../../../shared/grid/abstract-grid.component';
import { BasicGridComponent } from '../../../shared/grid/basic-grid/basic-grid.component';
import { AdminUserService } from '../../services/admin-user.service';
import { AdminUserModel } from '../admin-user.model';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../../shared/components/confirm-dialog/confirm-dialog.data';
import { SnackNotificationService } from '../../../core/notifications/snack-notification.service';
import { SnackNotificationModel } from '../../../core/notifications/snack-notification.model';
import { SnackNotificationType } from '../../../core/notifications/snack-notification.type';

@Component({
  selector: 'mco-admin-user-grid',
  templateUrl: './admin-user-grid.component.html',
  styleUrls: ['./admin-user-grid.component.scss']
})
export class AdminUserGridComponent extends AbstractGridComponent {
  @ViewChild(BasicGridComponent) basicGrid: BasicGridComponent<AdminUserModel>;

  @Input() displayedColumns = ['userName', 'email', 'suspended', 'createdDate', 'suspendAction', 'removeAction'];

  constructor(
    private dialog: MatDialog,
    private snackNotificationService: SnackNotificationService,
    public adminUserService: AdminUserService) {
    super();
  }

  suspendAction(user: AdminUserModel): void {
    this.adminUserService.toggleUserSuspension(user.id).subscribe(() => {
      this.snackNotificationService.notify(new SnackNotificationModel({
        type: SnackNotificationType.Success,
        message: `User ${user.suspended ? 'Unsuspended' : 'Suspended'}`,
      }));
      this.basicGrid.dataSource.refresh();
    });
  }

  removeAction(user: AdminUserModel): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData>{
        title: 'Delete User',
        description: `Are you sure you want to permenently remove the user '${user.userName}'?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }
      this.adminUserService.remove(user.id).subscribe(x => {
        this.snackNotificationService.notify(new SnackNotificationModel({
          type: SnackNotificationType.Success,
          message: 'User Deleted',
        }));
      });
      this.basicGrid.dataSource.refresh();
    });
  }
}
