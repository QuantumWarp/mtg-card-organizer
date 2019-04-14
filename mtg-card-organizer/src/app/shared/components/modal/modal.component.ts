import { Component, Input } from '@angular/core';

@Component({
  selector: 'mco-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() contentPadding = '20px';
}
