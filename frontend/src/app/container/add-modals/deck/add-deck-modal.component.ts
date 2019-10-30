import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { DeckService } from '../../../deck/services/deck.service';
import { Container } from '../../models/container';
import { AddCollectionModalComponent } from '../collection/add-collection-modal.component';

@Component({
  selector: 'mco-add-deck-modal',
  templateUrl: './add-deck-modal.component.html',
  styleUrls: ['./add-deck-modal.component.scss'],
})
export class AddDeckModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private parentContainer: Container,
    private formBuilder: FormBuilder,
    private deckService: DeckService,
    private dialogRef: MatDialogRef<AddCollectionModalComponent>,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [, Validators.required],
    });
  }

  confirm(): void {
    if (!this.form.valid) { return; }

    this.deckService
      .create(this.form.value.name, this.parentContainer.id)
      .subscribe(result => this.dialogRef.close(result || true));
  }
}
