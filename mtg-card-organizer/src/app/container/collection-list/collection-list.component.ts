import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Collection } from '../../collection/models/collection';
import { CollectionService } from '../../collection/services/collection.service';
import { SnackNotificationModel } from '../../core/notifications/snack-notification.model';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.data';

@Component({
  selector: 'mco-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent {
  @Output() containerInvalidated = new EventEmitter();
  @Output() addClicked = new EventEmitter();

  @Input() collections: Collection[];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackNotificationService: SnackNotificationService,
    private collectionService: CollectionService) { }

  itemSelected(collection: Collection): void {
    this.router.navigateByUrl('/collections/' + collection.id);
  }

  deleteItem(collection: Collection): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData> {
        title: 'Delete Collection',
        description: 'Are you sure you want to delete \'' + collection.name + '\'',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }
      this.collectionService.delete(collection.id).subscribe(() => {
        this.snackNotificationService.notify(new SnackNotificationModel({
          message: '\'' + collection.name + '\' Deleted',
          type: SnackNotificationType.Success,
        }));
        this.containerInvalidated.emit();
      });
    });
  }
}
