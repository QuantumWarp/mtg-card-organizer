import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { LoadingService } from '../../core/loading/loading.service';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';
import { Collection } from '../models/collection';
import { CollectionService } from '../services/collection.service';

@Component({
  selector: 'app-collection-import',
  templateUrl: './collection-import.component.html',
  styleUrls: ['../collection.scss']
})
export class CollectionImportComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('inputArea') inputArea: ElementRef;
  @Input() collection: Collection;

  constructor(
    private loadingService: LoadingService,
    private notificationService: SnackNotificationService,
    private collectionService: CollectionService,
    private dialogRef: MatDialogRef<CollectionImportComponent>) { }

  openFileDialog(): void {
    const event = new MouseEvent('click', {bubbles: false});
    this.fileInput.nativeElement.dispatchEvent(event);
  }

  fileChanged(value: any) {
    const file: File = this.fileInput.nativeElement.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = () => {
      this.inputArea.nativeElement.value = myReader.result;
    };

    myReader.readAsText(file);
  }

  // import(): void {
  //   const importPromise = this.collectionService.importCards(
  //     this.collection ? this.collection.id : null, this.inputArea.nativeElement.value).toPromise();
  //   this.loadingService.load('Importing...', importPromise);
  //   importPromise.then(() => {
  //     this.notificationService.notify({
  //       message: 'Collection Imported',
  //       type: SnackNotificationType.Success,
  //     });
  //     this.dialogRef.close(true);
  //   });
  // }

  close(): void {
    this.dialogRef.close(false);
  }
}
