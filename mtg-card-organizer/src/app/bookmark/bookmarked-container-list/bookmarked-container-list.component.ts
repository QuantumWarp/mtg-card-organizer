import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Container } from '../../container/models/container';
import { ContainerService } from '../../container/services/container.service';
import { SnackNotificationModel } from '../../core/notifications/snack-notification.model';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.data';

@Component({
  selector: 'app-bookmarked-container-list',
  templateUrl: './bookmarked-container-list.component.html',
  styleUrls: ['./bookmarked-container-list.component.scss']
})
export class BookmarkedContainerListComponent {
  @Output() containerInvalidated = new EventEmitter();
  @Output() addClicked = new EventEmitter();

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
        title: 'Remove Bookmark',
        description: 'Are you sure you want to remove bookmark for \'' + container.name + '\'',
      })
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }
      this.containerService.toggleBookmark(container.id).subscribe(() => {
        this.snackNotificationService.notify(new SnackNotificationModel({
          message: 'Removed Bookmark',
          type: SnackNotificationType.Success,
        }));
        this.containerInvalidated.emit();
      });
    });
  }
}
