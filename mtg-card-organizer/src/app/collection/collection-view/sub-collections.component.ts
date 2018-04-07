import { Component, Input } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { PageSortFilter } from '../../general/filtering/page-sort-filter';
import { PropertyFilter } from '../../general/filtering/property-filter';
import { PropertyFilterOperator } from '../../general/filtering/property-filter-operator';
import { LoadingService } from '../../general/loading/loading.service';
import { SnackNotificationService } from '../../general/notifications/snack-notification.service';
import { Collection } from '../models/collection';
import { CollectionService } from '../services/collection.service';

@Component({
  selector: 'app-sub-collections',
  templateUrl: './sub-collections.component.html',
  styleUrls: ['../collection.scss']
})
export class SubCollectionsComponent  {
  @Input() collection: Collection;
  @Input() subCollections = new Array<Collection>();

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  collectionClicked(collection: Collection): void {
    const prefix = this.collection ? '../' : './';
    this.router.navigate([prefix, collection.id], { relativeTo: this.route });
  }
}
