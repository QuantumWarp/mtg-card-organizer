import { Component, Input } from '@angular/core';

import { Collection } from '../../collection/models/collection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent {
  @Input() collections: Collection[];

  constructor(private router: Router) { }

  itemSelected(collection: Collection): void {
    this.router.navigateByUrl('/collections/' + collection.id);
  }
}
