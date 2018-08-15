import { Component, Input } from '@angular/core';
import { Collection } from '../models/collection';
import { MatDialogRef } from '@angular/material';
import { CollectionService } from '../services/collection.service';

@Component({
  selector: 'app-collection-export',
  templateUrl: './collection-export.component.html',
  styleUrls: ['../collection.scss']
})
export class CollectionExportComponent {
  @Input() collection: Collection;

  constructor(
    private collectionService: CollectionService,
    private dialogRef: MatDialogRef<CollectionExportComponent>) { }

  download(): void {
    // this.collectionService.export(this.collection.id);
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
