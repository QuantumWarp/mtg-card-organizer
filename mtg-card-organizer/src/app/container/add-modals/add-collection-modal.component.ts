import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { CollectionService } from '../../collection/services/collection.service';
import { Container } from '../models/container';

@Component({
  selector: 'mco-add-collection-modal',
  templateUrl: './add-collection-modal.component.html',
  styleUrls: ['./modals.scss']
})
export class AddCollectionModalComponent {
  @Input() name: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private parentContainer: Container,
    private collectionService: CollectionService,
    private dialogRef: MatDialogRef<AddCollectionModalComponent>) { }

  confirm(): void {
    this.collectionService
      .create(this.name, this.parentContainer.id)
      .subscribe(result => this.dialogRef.close(result));
  }
}
