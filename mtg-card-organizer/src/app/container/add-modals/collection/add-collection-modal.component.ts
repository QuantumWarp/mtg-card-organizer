import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { CollectionService } from '../../../collection/services/collection.service';
import { Container } from '../../models/container';

@Component({
  selector: 'mco-add-collection-modal',
  templateUrl: './add-collection-modal.component.html',
  styleUrls: ['./add-collection-modal.component.scss'],
})
export class AddCollectionModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private parentContainer: Container,
    private formBuilder: FormBuilder,
    private collectionService: CollectionService,
    private dialogRef: MatDialogRef<AddCollectionModalComponent>,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [, Validators.required],
    });
  }

  confirm(): void {
    if (!this.form.valid) { return; }

    this.collectionService
      .create(this.form.value.name, this.parentContainer.id)
      .subscribe(result => this.dialogRef.close(result));
  }
}
