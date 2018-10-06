import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Container } from '../models/container';
import { ContainerService } from '../services/container.service';

@Component({
  templateUrl: './container-export.component.html'
})
export class ContainerExportComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public container: Container,
    private collectionService: ContainerService,
    private dialogRef: MatDialogRef<ContainerExportComponent>) { }

  download(): void {
    this.collectionService.export(this.container.id);
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
