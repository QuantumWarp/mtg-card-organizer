import { Component, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { ImportService } from '../services/import.service';
import { LoadingService } from '../../general/loading/loading.service';
import { SnackNotificationService } from '../../general/notifications/snack-notification.service';
import { SnackNotificationType } from '../../general/notifications/snack-notification.type';

@Component({
  selector: 'app-import-cards',
  templateUrl: './import-cards.component.html',
  styleUrls: ['./import-cards.scss']
})
export class ImportCardsComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('inputArea') inputArea: ElementRef;

  constructor(
    private importService: ImportService,
    private loadingService: LoadingService,
    private notificationService: SnackNotificationService) {}

  openFileDialog(): void {
    const event = new MouseEvent('click', {bubbles: false});
    this.fileInput.nativeElement.dispatchEvent(event);
  }

  fileChanged(value: any) {
    console.log(this.fileInput.nativeElement.files[0]);
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
