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

@Component({
  selector: 'app-single-collection-view',
  templateUrl: './single-collection-view.component.html',
  styleUrls: ['../collection.scss']
})
export class SingleCollectionViewComponent implements OnInit {
  collection: Collection;
  subCollections: Collection[];

  collectionCardServiceWrapper: CollectionCardServiceWrapper;

  constructor(public collectionService: CollectionService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.collection = this.route.snapshot.data['collection'];
    });
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

  collectionClicked(collection: Collection): void {
    this.router.navigate(['../' + collection.id], { relativeTo: this.route });
  }

  openRapidEntry() {
    const dialogRef = this.dialog.open(CardRapidEntryComponent, { disableClose: true });
  }
}
