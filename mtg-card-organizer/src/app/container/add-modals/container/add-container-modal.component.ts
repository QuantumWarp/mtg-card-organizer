import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Container } from '../../models/container';
import { ContainerService } from '../../services/container.service';
import { AddCollectionModalComponent } from '../collection/add-collection-modal.component';

@Component({
  selector: 'mco-add-container-modal',
  templateUrl: './add-container-modal.component.html',
  styleUrls: ['./add-container-modal.component.scss'],
})
export class AddContainerModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private parentContainer: Container,
    private formBuilder: FormBuilder,
    private containerService: ContainerService,
    private dialogRef: MatDialogRef<AddCollectionModalComponent>,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [, Validators.required],
    });
  }

  confirm(): void {
    if (!this.form.valid) { return; }

    this.containerService
      .create(this.form.value.name, this.parentContainer.id)
      .subscribe(result => this.dialogRef.close(result));
  }
}
