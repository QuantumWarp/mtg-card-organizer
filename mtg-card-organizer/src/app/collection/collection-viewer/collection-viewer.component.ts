import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { Collection } from '../models/collection';
import { CollectionService } from '../services/collection.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-collection-viewer',
  templateUrl: './collection-viewer.component.html',
  styleUrls: ['../collection.scss']
})
export class CollectionViewerComponent implements OnInit {
  collections: Collection[];

  constructor(private collectionService: CollectionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.collectionService.queryBaseCollections(new PageSortFilter()).subscribe(result => {
      this.collections = result.data;
    });
  }

  collectionClicked(collection: Collection): void {
    this.router.navigate(['./' + collection.id], { relativeTo: this.route });
  }
}
