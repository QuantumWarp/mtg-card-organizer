import { Component, Input } from '@angular/core';

@Component({
  selector: 'mco-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() contentPadding = '20px';
}
