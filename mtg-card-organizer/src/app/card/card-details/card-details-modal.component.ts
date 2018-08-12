import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { CardInstance } from '../models/card-instance';

@Component({
  templateUrl: './card-details-modal.component.html',
})
export class CardDetailsModalComponent {
  @Input() cardInstance: CardInstance;

  constructor(private dialogRef: MatDialogRef<CardDetailsModalComponent>) { }

  close(): void {
    this.dialogRef.close();
  }
}
