import { Component, Input } from '@angular/core';
import { Collection } from '../models/collection';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-collection-export',
  templateUrl: './collection-export.component.html',
  styleUrls: ['../collection.scss']
})
export class CollectionExportComponent {
  @Input() collection: Collection;

  constructor(private dialogRef: MatDialogRef<CollectionExportComponent>) { }

  close(): void {
    this.dialogRef.close();
  }
}
