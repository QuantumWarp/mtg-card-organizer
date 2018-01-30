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

  constructor(public collectionService: CollectionService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

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
    const dialogRef = this.dialog.open(CardRapidEntryComponent, { disableClose: true, minWidth: '600px' });
    dialogRef.afterClosed().subscribe(results => {
      this.collectionService.addCards(this.collection.id, results).subscribe(cardsAdded =>
        this.cardSearchComponent.cardDataSource.reloadData()
      );
    });
  }

  openExport(): void {
    const dialogRef = this.dialog.open(CollectionExportComponent);
    dialogRef.componentInstance.collection = this.collection;
  }

  openImport(): void {
    const dialogRef = this.dialog.open(CollectionImportComponent);
    dialogRef.componentInstance.collection = this.collection;
    dialogRef.afterClosed().subscribe(success => success ? this.refresh() : null);
  }

  createCollection(): void {
    const dialogRef = this.dialog.open(CreateCollectionComponent);
    dialogRef.componentInstance.parentCollection = this.collection;
    dialogRef.afterClosed().subscribe(success => success ? this.refresh() : null);
  }

  deleteCollection(): void {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.componentInstance.title = 'Delete Collection';
    dialogRef.componentInstance.description = 'Are you sure?';
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.collectionService.deleteCollection(this.collection.id).subscribe(success => {
          if (success && this.collection.parentId) {
            this.router.navigate([this.collection ? '../' : './', this.collection.parentId], { relativeTo: this.route });
          } else if (success) {
            this.router.navigate(['../'], { relativeTo: this.route });
          }
        });
      }
    });
  }
}
