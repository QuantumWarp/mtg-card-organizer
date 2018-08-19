import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Container } from '../models/container';
import { ContainerService } from '../services/container.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.data';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationModel } from '../../core/notifications/snack-notification.model';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';

@Component({
  selector: 'app-sub-container-list',
  templateUrl: './sub-container-list.component.html',
  styleUrls: ['./sub-container-list.component.scss']
})
export class SubContainerListComponent {
  @Output() containerInvalidated = new EventEmitter();

  @Input() containers: Container[];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackNotificationService: SnackNotificationService,
    private containerService: ContainerService) { }

  itemSelected(container: Container): void {
    this.router.navigateByUrl('/containers/' + container.id);
  }

  deleteItem(container: Container): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogData({
        title: 'Delete Container',
        description: 'Are you sure you want to delete \'' + container.name + '\'',
      })
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }
      this.containerService.delete(container.id).subscribe(() => {
        this.snackNotificationService.notify(new SnackNotificationModel({
          message: '\'' + container.name + '\' Deleted',
          type: SnackNotificationType.Success,
        }));
        this.containerInvalidated.emit();
      });
    });
  }
}
