import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../authentication/services/authentication.service';
import { CardDetailsModalComponent } from '../../card/details/modal/card-details-modal.component';
import { CardFilterData } from '../../card/filter/card-filter-data';
import { CardFilterComponent } from '../../card/filter/card-filter.component';
import { CardQuery } from '../../card/models/card-query';
import { SnackNotificationModel } from '../../core/notifications/snack-notification.model';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.data';
import { WrappedDataService } from '../../shared/utils/wrapped-data-service';
import { CardRapidEntryComponent } from '../card-rapid-entry/card-rapid-entry/card-rapid-entry.component';
import { ConvertedCard, VariableGridComponent } from '../grids/variable-grid/variable-grid.component';
import { CardInstance } from '../models/card-instance';
import { CardInstanceGroupedCard } from '../models/card-instance-grouped-card';
import { Collection } from '../models/collection';
import { CollectionCardService } from '../services/collection-card.service';
import { CollectionService } from '../services/collection.service';

@Component({
  selector: 'mco-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss']
})
export class CollectionPageComponent implements OnInit {
  @ViewChild(VariableGridComponent) grid: VariableGridComponent;

  filter = new CardQuery();
  collection: Collection;
  wrappedService: WrappedDataService<CardInstanceGroupedCard, CardInstanceGroupedCard>;

  constructor(
    public authService: AuthenticationService,
    public collectionCardService: CollectionCardService,
    public collectionService: CollectionService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private notificationService: SnackNotificationService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.collection = this.route.snapshot.data['collection'];
      this.filter.collectionIds = [ this.collection.id ];
    });
  }

  openFilter(): void {
    const filterDialog = this.dialog.open(CardFilterComponent, {
      data: new CardFilterData({
        canSelectCollection: false,
        currentFilter: this.filter,
      }),
    });

    filterDialog.afterClosed().subscribe((result) => {
      if (!result) { return; }
      this.filter = result;
    });
  }

  openRapidEntry(): void {
    const rapidEntryDialog = this.dialog.open(CardRapidEntryComponent, {
      data: this.collection,
      disableClose: true,
      width: '75vw',
    });
    rapidEntryDialog.afterClosed().subscribe(() => this.grid.refreshDataSource());
  }

  rowSelected(convertedCard: ConvertedCard): void {
    this.dialog.open(CardDetailsModalComponent, { data: convertedCard.cardSet });
  }

  removeFromCollection(convertedCard: ConvertedCard): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData> {
        title: `Remove ${convertedCard.card.name}`,
        description: 'Are you sure?',
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.collectionCardService.deleteCards(this.collection.id, [ convertedCard.cardInstance.id ]).subscribe(() => {
          this.grid.refreshDataSource();
          this.notificationService.notify(new SnackNotificationModel({
            message: 'Removed',
            type: SnackNotificationType.Success,
          }));
        });
      }
    });
  }

  toggleBookmark(): void {
    this.collectionService.toggleBookmark(this.collection.id)
      .subscribe(() => this.collection.isBookmarked = !this.collection.isBookmarked);
  }
}
