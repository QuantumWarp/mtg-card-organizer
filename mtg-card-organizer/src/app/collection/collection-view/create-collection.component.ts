import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { LoadingService } from '../../core/loading/loading.service';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';
import { Collection } from '../models/collection';
import { CollectionService } from '../services/collection.service';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['../collection.scss']
})
export class CreateCollectionComponent {
  parentCollection: Collection;
  collectionName: string;

  constructor(
    private loadingSerivce: LoadingService,
    private notificationService: SnackNotificationService,
    public collectionService: CollectionService,
    private dialogRef: MatDialogRef<CreateCollectionComponent>) { }

  close(): void {
    this.dialogRef.close(false);
  }

  create(): void {
    const createPromise = this.collectionService.createCollection(
      this.collectionName, this.parentCollection ? this.parentCollection.id : null).toPromise();
    this.loadingSerivce.load('Creating collection...', createPromise);
    createPromise.then(() => {
      this.notificationService.notify({
        message: 'Collection Created',
        type: SnackNotificationType.Success,
      });
      this.dialogRef.close(true);
    });
  }
}
