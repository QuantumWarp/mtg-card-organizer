import { Component, Input } from '@angular/core';

import { Card } from '../models/card';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './card-details-modal.component.html',
})
export class CardDetailsModalComponent {
  @Input() card: Card;

  constructor(private dialogRef: MatDialogRef<CardDetailsModalComponent>) { }

  close(): void {
    this.dialogRef.close();
  }
}
