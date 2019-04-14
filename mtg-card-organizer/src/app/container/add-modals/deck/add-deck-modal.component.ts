import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { DeckService } from '../../../deck/services/deck.service';
import { Container } from '../../models/container';

@Component({
  selector: 'mco-add-deck-modal',
  templateUrl: './add-deck-modal.component.html',
  styleUrls: ['./add-deck-modal.component.scss'],
})
export class AddDeckModalComponent {
  name: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private parentContainer: Container,
    private deckService: DeckService,
    private dialogRef: MatDialogRef<AddDeckModalComponent>,
  ) { }

  confirm(): void {
    this.deckService
      .create(this.name, this.parentContainer.id)
      .subscribe(result => this.dialogRef.close(result));
  }
}
