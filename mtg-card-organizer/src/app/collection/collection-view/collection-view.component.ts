import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Card } from '../../card/models/card';
import { CardService } from '../../card/services/card.service';
import { DataService } from '../../general/grid/grid-data-source.interfaces';
import { PageSortFilter } from '../../general/filtering/page-sort-filter';
import { PagedData } from '../../general/filtering/paged-data';
import { PropertyFilter } from '../../general/filtering/property-filter';
import { Collection } from '../models/collection';
import { CollectionService, CollectionCardServiceWrapper } from '../services/collection.service';
import { CardRapidEntryComponent } from '../../card/card-rapid-entry/card-rapid-entry.component';
import { CollectionExportComponent } from '../collection-export/collection-export.component';
import { CollectionImportComponent } from '../collection-import/collection-import.component';
import { CreateCollectionComponent } from './create-collection.component';
import { ConfirmComponent } from '../../general/components/confirm.component';
import { PropertyFilterOperator } from '../../general/filtering/property-filter-operator';
import { CardSearchComponent } from '../../card/card-search/card-search.component';
import { CardDetailsModalComponent } from '../../card/card-details/card-details-modal.component';
import { CardOtherInfo } from '../../card/models/card-other-info';
import { LoadingService } from '../../general/loading/loading.service';
import { SnackNotificationService } from '../../general/notifications/snack-notification.service';
import { SnackNotificationType } from '../../general/notifications/snack-notification.type';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['../collection.scss']
})
export class CollectionViewComponent implements OnInit {
  @ViewChild(CardSearchComponent) cardSearchComponent: CardSearchComponent;
  collection: Collection;
  subCollections = new Array<Collection>();

  collectionCardServiceWrapper: CollectionCardServiceWrapper;

  constructor(
    public collectionService: CollectionService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private notificationService: SnackNotificationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.collection = this.route.snapshot.data['collection'];
      this.refreshPage(this.collection);
    });
  }

  refreshPage(collection: Collection): void {
    this.collection = collection;
    this.subCollections = new Array<Collection>();

    if (!this.collection) {
      this.refreshAsBase();
    } else {
      this.refresh();
    }
  }

  refreshAsBase(): void {
    this.collectionService.queryBaseCollections(new PageSortFilter()).subscribe(result => {
      this.subCollections = result.data;
    });
  }

  refresh(): void {
    this.collectionCardServiceWrapper = new CollectionCardServiceWrapper(this.collection.id, this.collectionService);

    if (this.cardSearchComponent) {
      this.cardSearchComponent.cardDataSource.dataService = this.collectionCardServiceWrapper;
      this.cardSearchComponent.cardDataSource.reloadData();
    }

    const pageSortFilter = new PageSortFilter();
    pageSortFilter.addSubFilter(new PropertyFilter({
      property: 'parentId',
      operator: PropertyFilterOperator.IsEqual,
      value: this.collection.id
    }));
    this.collectionService.query(pageSortFilter).subscribe(result => {
      this.subCollections = result.data;
    });
  }

  collectionClicked(collection: Collection): void {
    const prefix = this.collection ? '../' : './';
    this.router.navigate([prefix, collection.id], { relativeTo: this.route });
  }

  openRapidEntry() {
    const dialogRef = this.dialog.open(CardRapidEntryComponent, {
      disableClose: true,
      minWidth: '600px',
      data: (cio: CardOtherInfo[]) => this.collectionService.addCards(this.collection.id, cio).toPromise()
    });

    dialogRef.afterClosed().subscribe(results => {
      this.notificationService.notify({ message: 'Added Cards', type: SnackNotificationType.Success });
      this.cardSearchComponent.cardDataSource.reloadData();
    });
  }

  cardSelected(card: Card) {
    const dialogRef = this.dialog.open(CardDetailsModalComponent);
    dialogRef.componentInstance.card = card;
  }

  openExport(): void {
    const dialogRef = this.dialog.open(CollectionExportComponent);
    dialogRef.componentInstance.collection = this.collection;
  }

  openImport(): void {
    const dialogRef = this.dialog.open(CollectionImportComponent);
    dialogRef.componentInstance.collection = this.collection;
    dialogRef.afterClosed().subscribe(success => success ? this.refreshPage(this.collection) : null);
  }

  createCollection(): void {
    const dialogRef = this.dialog.open(CreateCollectionComponent);
    dialogRef.componentInstance.parentCollection = this.collection;
    dialogRef.afterClosed().subscribe(success => success ? this.refreshPage(this.collection) : null);
  }

  deleteCollection(): void {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.componentInstance.title = 'Delete Collection';
    dialogRef.componentInstance.description = 'Are you sure?';
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        const deletePromise = this.collectionService.deleteCollection(this.collection.id).toPromise();
        const navPromise = () => {
          if (this.collection.parentId) {
            return this.router.navigate([this.collection ? '../' : './', this.collection.parentId], { relativeTo: this.route });
          } else {
            return this.router.navigate(['../'], { relativeTo: this.route });
          }
        };
        this.loadingService.load('Deleting...', deletePromise.then(navPromise));
        deletePromise.then(() => this.notificationService.notify({ message: 'Collection Deleted', type: SnackNotificationType.Success }));
      }
    });
  }
}
