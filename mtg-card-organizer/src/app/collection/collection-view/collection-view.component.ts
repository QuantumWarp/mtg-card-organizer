import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/services/authentication.service';
import { CardRapidEntryComponent } from '../../card/card-rapid-entry/card-rapid-entry.component';
import { CardInstance } from '../../card/models/card-instance';
import { LoadingService } from '../../core/loading/loading.service';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.data';
import { PageSortFilter } from '../../shared/filtering/page-sort-filter';
import { PropertyFilter } from '../../shared/filtering/property-filter';
import { PropertyFilterOperator } from '../../shared/filtering/property-filter-operator';
import { CollectionExportComponent } from '../collection-export/collection-export.component';
import { CollectionImportComponent } from '../collection-import/collection-import.component';
import { Collection } from '../models/collection';
import { CollectionService } from '../services/collection.service';
import { CollectionCardsComponent } from './collection-cards.component';
import { CreateCollectionComponent } from './create-collection.component';
import { SubCollectionsComponent } from './sub-collections.component';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['../collection.scss']
})
export class CollectionViewComponent implements OnInit {
  @ViewChild(SubCollectionsComponent) subCollectionsComponent: SubCollectionsComponent;
  @ViewChild(CollectionCardsComponent) collectionCardsComponent: CollectionCardsComponent;

  collection: Collection;
  subCollections = new Array<Collection>();

  constructor(
    public collectionService: CollectionService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private notificationService: SnackNotificationService,
    public authService: AuthenticationService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.collection = this.route.snapshot.data['collection'];
      this.changeDetector.detectChanges();
      this.refreshSubCollections();
    });
  }

  openRapidEntry() {
    const dialogRef = this.dialog.open(CardRapidEntryComponent, {
      disableClose: true,
      minWidth: '600px',
      data: (cio: CardInstance[]) => this.collectionService.addCards(this.collection.id, cio).toPromise()
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

  openImport(): void {
    const dialogRef = this.dialog.open(CollectionImportComponent);
    dialogRef.componentInstance.collection = this.collection;
    dialogRef.afterClosed().subscribe(success => success ? this.refreshSubCollections() : null);
  }

  createCollection(): void {
    const dialogRef = this.dialog.open(CreateCollectionComponent);
    dialogRef.componentInstance.parentCollection = this.collection;
    dialogRef.afterClosed().subscribe(success => success ? this.refreshSubCollections() : null);
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

  private refreshSubCollections(): void {
    this.subCollections = new Array<Collection>();

    if (!this.collection) {
      this.refreshAsBase();
    } else {
      this.refresh();
    }
  }

  private refresh(): void {
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

  private refreshAsBase(): void {
    this.collectionService.queryBaseCollections(new PageSortFilter()).subscribe(result => {
      this.subCollections = result.data;
    });
  }
}
