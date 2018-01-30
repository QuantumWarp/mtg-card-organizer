import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Collection } from '../models/collection';
import { CollectionService } from '../services/collection.service';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['../collection.scss']
})
export class CreateCollectionComponent {
  parentCollection: Collection;
  collectionName: string;

  constructor(public collectionService: CollectionService, private dialogRef: MatDialogRef<CreateCollectionComponent>) { }

  close(): void {
    this.dialogRef.close(false);
  }

  create(): void {
    this.collectionService.createCollection(this.collectionName, this.parentCollection ? this.parentCollection.id : null).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
