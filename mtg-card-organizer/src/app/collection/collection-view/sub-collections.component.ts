import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Collection } from '../models/collection';

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
