import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { LoadingService } from '../../../core/loading/loading.service';
import { SnackNotificationService } from '../../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../../core/notifications/snack-notification.type';
import { Container } from '../../models/container';
import { ContainerService } from '../../services/container.service';

@Component({
  templateUrl: './container-import.component.html',
  styleUrls: ['./container-import.component.scss'],
})
export class ContainerImportComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('inputArea') inputArea: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) private container: Container,
    private loadingService: LoadingService,
    private notificationService: SnackNotificationService,
    private containerService: ContainerService,
    private dialogRef: MatDialogRef<ContainerImportComponent>,
  ) { }

  openFileDialog(): void {
    const event = new MouseEvent('click', {bubbles: false});
    this.fileInput.nativeElement.dispatchEvent(event);
  }

  fileChanged() {
    const file: File = this.fileInput.nativeElement.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = () => {
      this.inputArea.nativeElement.value = myReader.result;
    };

    myReader.readAsText(file);
  }

  import(): void {
    const importPromise = this.containerService.import(this.container.id, this.inputArea.nativeElement.value).toPromise();
    this.loadingService.load('Importing...', importPromise);
    importPromise.then(() => {
      this.notificationService.notify({
        message: 'Collection Imported',
        type: SnackNotificationType.Success,
      });
      this.dialogRef.close(true);
    });
  }
}
