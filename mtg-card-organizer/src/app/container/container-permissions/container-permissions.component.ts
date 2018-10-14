import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { debounceTime } from 'rxjs/internal/operators';

import { UserQuery } from '../../bookmark/models/user-query';
import { UserService } from '../../bookmark/services/user.service';
import { SnackNotificationModel } from '../../core/notifications/snack-notification.model';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';
import { Paging } from '../../shared/filtering/paging';
import { Container } from '../models/container';
import { Permission } from '../models/permission';
import { UserPermissionModel } from '../models/user-permission.model';
import { ContainerIdPermissionService, ContainerPermissionService } from '../services/container-permission.service';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
  selector: 'app-container-permissions',
  templateUrl: './container-permissions.component.html',
  styleUrls: ['./container-permissions.component.scss']
})
export class ContainerPermissionsComponent implements OnInit {

  permissions = Permission;
  allUsers = false;

  // Permissions
  permssionDataService: ContainerIdPermissionService;

  userPermissionsDisplayedColumns = [ 'userName', 'permission', 'setPermission' ];

  // User Search
  searchFormControl = new FormControl();

  userQuery = new UserQuery({
    paging: new Paging({ limit: 10 }),
  });

  userDisplayedColumns = [ 'userName', 'setPermission' ];

  constructor(
    @Inject(MAT_DIALOG_DATA) private container: Container,
    private dialogRef: MatDialogRef<ContainerPermissionsComponent>,
    private snackNotificationService: SnackNotificationService,
    public containerPermissionService: ContainerPermissionService,
    private authenticationService: AuthenticationService,
    public userService: UserService
  ) {
    console.log(container);
    this.permssionDataService = new ContainerIdPermissionService(this.container.id, this.containerPermissionService);
  }

  ngOnInit(): void {
    this.searchFormControl.valueChanges.pipe(
      debounceTime(500),
    ).subscribe(value => {
      this.userQuery = new UserQuery({
        paging: new Paging({ limit: 10 }),
        userName: value,
      });
    });
  }

  setPermission(userId: string, permission: Permission): void {
    if (userId === this.authenticationService.id) {
      this.snackNotificationService.notify(new SnackNotificationModel({
        type: SnackNotificationType.Error,
        message: 'Cannot Update Own Permissions',
      }));
      return;
    }

    this.containerPermissionService.updatePermission(this.container.id, new UserPermissionModel(userId, permission))
      .subscribe(() => {
        this.snackNotificationService.notify(new SnackNotificationModel({
          type: SnackNotificationType.Success,
          message: 'Updated User Permission',
        }));
        this.dialogRef.close();
      });
  }
}
