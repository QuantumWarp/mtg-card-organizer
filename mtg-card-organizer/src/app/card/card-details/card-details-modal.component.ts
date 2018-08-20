import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CardInstance } from '../models/card-instance';
import { CardSet } from '../models/card-set';

@Component({
  templateUrl: './card-details-modal.component.html',
})
export class CardDetailsModalComponent {
  @Input() cardInstance: CardInstance;

  constructor(
    @Inject(MAT_DIALOG_DATA) public cardSet: CardSet,
    private dialogRef: MatDialogRef<CardDetailsModalComponent>) { }

  close(): void {
    this.dialogRef.close();
  }
}
