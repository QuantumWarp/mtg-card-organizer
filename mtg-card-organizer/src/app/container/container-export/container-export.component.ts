import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Container } from '../models/container';
import { ContainerService } from '../services/container.service';

@Component({
  templateUrl: './container-export.component.html'
})
export class ContainerExportComponent {
  @Input() container: Container;

  constructor(
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
