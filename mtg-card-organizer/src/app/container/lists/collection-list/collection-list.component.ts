import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Collection } from '../../../collection/models/collection';
import { CollectionService } from '../../../collection/services/collection.service';
import { SnackNotificationService } from '../../../core/notifications/snack-notification.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../../shared/components/confirm-dialog/confirm-dialog.data';
import { AddCollectionModalComponent } from '../../add-modals/collection/add-collection-modal.component';
import { Container } from '../../models/container';

@Component({
  selector: 'mco-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent {
  @Output() collectionsUpdated = new EventEmitter();

  @Input() container: Container;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackNotificationService: SnackNotificationService,
    private collectionService: CollectionService,
  ) { }

  viewCollection(collection: Collection): void {
    this.router.navigateByUrl('/collections/' + collection.id);
  }

  createCollection(): void {
    const dialogRef = this.dialog.open(AddCollectionModalComponent, {
      data: this.container,
    });
    dialogRef.afterClosed().subscribe((success) => success && this.collectionsUpdated.emit());
  }

  deleteCollection(collection: Collection): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData> {
        title: 'Delete Collection',
        description: `Are you sure you want to delete '${collection.name}'`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }

      this.collectionService.delete(collection.id).subscribe(() => {
        this.snackNotificationService.notifySuccess(`'${collection.name}' Deleted`);
        this.collectionsUpdated.emit();
      });
    });
  }
}
