import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/services/authentication.service';
import { CardRapidEntryComponent } from '../../card/card-rapid-entry/card-rapid-entry.component';
import { CardInstance } from '../../card/models/card-instance';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.data';
import { CollectionExportComponent } from '../collection-export/collection-export.component';
import { Collection } from '../models/collection';
import { CollectionService } from '../services/collection.service';
import { CardDetailsModalComponent } from '../../card/card-details/card-details-modal.component';
import { CollectionCardServiceWrapper, CollectionCardService } from '../services/collection-card.service';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['../collection.scss']
})
export class CollectionPageComponent implements OnInit {
  collection: Collection;
  collectionCardServiceWrapper: CollectionCardServiceWrapper;

  constructor(
    public collectionCardService: CollectionCardService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: SnackNotificationService,
    public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.collection = this.route.snapshot.data['collection'];
      this.collectionCardServiceWrapper = new CollectionCardServiceWrapper(this.collection.id, this.collectionCardService);
    });
  }

  cardInstanceSelected(cardInstance: CardInstance): void {
    const dialogRef = this.dialog.open(CardDetailsModalComponent);
    dialogRef.componentInstance.cardInstance = cardInstance;
  }

  openRapidEntry() {
    const dialogRef = this.dialog.open(CardRapidEntryComponent, {
      disableClose: true,
      minWidth: '600px',
      data: (cio: CardInstance[]) => this.collectionCardService.addCards(this.collection.id, cio).toPromise()
    });

    dialogRef.afterClosed().subscribe(results => {
      this.notificationService.notify({ message: 'Added Cards', type: SnackNotificationType.Success });
      // TODO: dont reload
      location.reload();
    });
  }

  openExport(): void {
    const dialogRef = this.dialog.open(CollectionExportComponent);
    dialogRef.componentInstance.collection = this.collection;
  }

  deleteCollection(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogData({
        title: 'Delete Collection',
        description: 'Are you sure?',
      })
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        // const deletePromise = this.collectionService.deleteCollection(this.collection.id).toPromise();
        const navPromise = () => {
          if (this.collection.containerId) {
            return this.router.navigate([this.collection ? '../' : './', this.collection.containerId], { relativeTo: this.route });
          } else {
            return this.router.navigate(['../'], { relativeTo: this.route });
          }
        };
        // this.loadingService.load('Deleting...', deletePromise.then(navPromise));
        // deletePromise.then(() => this.notificationService.notify({ message: 'Collection Deleted', type: SnackNotificationType.Success }));
      }
    });
  }
}
