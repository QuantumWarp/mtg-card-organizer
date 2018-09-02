import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/services/authentication.service';
import { CardDetailsModalComponent } from '../../card/card-details/card-details-modal.component';
import { CardInstance } from '../models/card-instance';
import { CardQuery } from '../../card/models/card-query';
import { SnackNotificationModel } from '../../core/notifications/snack-notification.model';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.data';
import { WrappedDataService } from '../../shared/utils/wrapped-data-service';
import { CardInstanceGridComponent } from '../card-instance-grid/card-instance-grid.component';
import { CardRapidEntryComponent } from '../card-rapid-entry/card-rapid-entry/card-rapid-entry.component';
import { Collection } from '../models/collection';
import { CollectionCardService, CollectionCardServiceWrapper } from '../services/collection-card.service';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss']
})
export class CollectionPageComponent implements OnInit {
  @ViewChild(CardInstanceGridComponent) grid: CardInstanceGridComponent;

  filter = new CardQuery();
  collection: Collection;
  wrappedService: WrappedDataService<CardInstance, CardInstance>;

  mode: 'view' | 'filter' | 'fastAdd' = 'view';

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
      const collectionCardServiceWrapper = new CollectionCardServiceWrapper(this.collection.id, this.collectionCardService);
      this.wrappedService = WrappedDataService.construct(collectionCardServiceWrapper);
    });
  }

  cardInstanceSelected(cardInstance: CardInstance): void {
    this.dialog.open(CardDetailsModalComponent, { data: cardInstance.cardSet });
  }

  removeFromCollection(cardInstance: CardInstance): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogData({
        title: `Remove ${cardInstance.cardSet.card.name}`,
        description: 'Are you sure?',
      })
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.collectionCardService.deleteCards(this.collection.id, [ cardInstance.id ]).subscribe(() => {
          this.refreshDataSource();
          this.notificationService.notify(new SnackNotificationModel({
            message: 'Removed!',
            type: SnackNotificationType.Success,
          }));
        });
      }
    });
  }

  refreshDataSource(): void {
    this.grid.cardSetGrid.cardGrid.basicGrid.dataSource.refresh();
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
}
