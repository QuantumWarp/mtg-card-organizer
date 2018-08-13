import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Container } from '../models/container';
import { ContainerService } from '../services/container.service';

@Component({
  selector: 'app-add-container-modal',
  templateUrl: './add-container-modal.component.html',
  styleUrls: ['./modals.scss']
})
export class AddContainerModalComponent {
  @Input() name: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private parentContainer: Container,
    private containerService: ContainerService,
    private dialogRef: MatDialogRef<AddContainerModalComponent>) { }

  confirm(): void {
    this.containerService
      .create(this.name, this.parentContainer.id)
      .subscribe(result => this.dialogRef.close(result));
  }
}
