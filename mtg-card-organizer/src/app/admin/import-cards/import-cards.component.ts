import { Component, ElementRef, ViewChild } from '@angular/core';

import { LoadingService } from '../../core/loading/loading.service';
import { SnackNotificationService } from '../../core/notifications/snack-notification.service';
import { SnackNotificationType } from '../../core/notifications/snack-notification.type';
import { ImportService } from '../services/import.service';

@Component({
  selector: 'mco-import-cards',
  templateUrl: './import-cards.component.html',
  styleUrls: ['./import-cards.component.scss']
})
export class ImportCardsComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('inputArea') inputArea: ElementRef;

  constructor(
    private importService: ImportService,
    private loadingService: LoadingService,
    private notificationService: SnackNotificationService,
  ) {}

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
    const importPromise = this.importService.import(this.inputArea.nativeElement.value).toPromise();
    this.loadingService.load('Importing...', importPromise);
    importPromise.then(() => this.notificationService.notify({
      message: 'Import Successful',
      type: SnackNotificationType.Success,
    }));
  }
}
