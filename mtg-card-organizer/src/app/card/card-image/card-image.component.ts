import { Input, Component } from '@angular/core';

import { Card } from '../models/card';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.scss']
})
export class CardImageComponent {
  @Input() card: Card;
  loaded = false;
}
