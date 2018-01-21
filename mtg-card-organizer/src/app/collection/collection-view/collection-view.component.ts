import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Card } from '../../card/models/card';
import { CardService } from '../../card/services/card.service';
import { DataService } from '../../general/grid/grid-data-source.interfaces';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { PagedData } from '../../general/grid/paged-data';
import { PropertyFilter, PropertyFilterOperator } from '../../general/grid/property-filter';
import { Collection } from '../models/collection';
import { CollectionService, CollectionCardServiceWrapper } from '../services/collection.service';
import { CardRapidEntryComponent } from '../../card/card-rapid-entry/card-rapid-entry.component';
import { CollectionExportComponent } from '../collection-export/collection-export.component';
import { CollectionImportComponent } from '../collection-import/collection-import.component';
import { CreateCollectionComponent } from './create-collection.component';
import { ConfirmComponent } from '../../general/components/confirm.component';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['../collection.scss']
})
export class CollectionViewComponent implements OnInit {
  collection: Collection;
  subCollections: Collection[];

  collectionCardServiceWrapper: CollectionCardServiceWrapper;

  constructor(public collectionService: CollectionService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.collection = this.route.snapshot.data['collection'];
    });

    if (!this.collection) {
      this.collectionService.queryBaseCollections(new PageSortFilter()).subscribe(result => {
        this.subCollections = result.data;
      });
    } else {
      this.collectionCardServiceWrapper = new CollectionCardServiceWrapper(this.collection.id, this.collectionService);

      const pageSortFilter = new PageSortFilter();
      pageSortFilter.filter.addSubFilter(new PropertyFilter(
        'parentId',
        PropertyFilterOperator.Equals,
        this.collection.id
      ));
      this.collectionService.query(pageSortFilter).subscribe(result => {
        this.subCollections = result.data;
      });
    }
  }

  collectionClicked(collection: Collection): void {
    const prefix = this.collection ? '../' : './';
    this.router.navigate([prefix, collection.id], { relativeTo: this.route });
  }

  openRapidEntry() {
    const dialogRef = this.dialog.open(CardRapidEntryComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(results => {
      this.collectionService.addCards(this.collection.id, results).subscribe(cardsAdded => {});
    });
  }

  openExport(): void {
    const dialogRef = this.dialog.open(CollectionExportComponent);
    dialogRef.componentInstance.collection = this.collection;
    dialogRef.afterClosed().subscribe(results => {
      this.collectionService.addCards(this.collection.id, results).subscribe(cardsAdded => {});
    });
  }

  openImport(): void {
    const dialogRef = this.dialog.open(CollectionImportComponent);
    dialogRef.componentInstance.collection = this.collection;
    dialogRef.afterClosed().subscribe(results => {
      this.collectionService.addCards(this.collection.id, results).subscribe(cardsAdded => {});
    });
  }

  createCollection(): void {
    const dialogRef = this.dialog.open(CreateCollectionComponent);
    dialogRef.componentInstance.parentCollection = this.collection;
  }

  deleteCollection(): void {
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.componentInstance.title = 'Delete Collection';
    dialogRef.componentInstance.description = 'Are you sure?';
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.collectionService.deleteCollection(this.collection.id).subscribe(result => {});
      }
    });
  }
}
