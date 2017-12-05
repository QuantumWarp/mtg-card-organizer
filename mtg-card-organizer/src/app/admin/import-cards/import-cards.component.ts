import { Component, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { ImportService } from '../services/import.service';

@Component({
  selector: 'app-import-cards',
  templateUrl: './import-cards.component.html',
  styleUrls: ['./import-cards.css']
})
export class ImportCardsComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('inputArea') inputArea: ElementRef;

  constructor(private importService: ImportService) {}

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
    this.importService.import(this.inputArea.nativeElement.value);
  }
}
