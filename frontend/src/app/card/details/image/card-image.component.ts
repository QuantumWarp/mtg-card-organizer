import { Component, Input } from '@angular/core';

import { ConvertedCard } from '../../../collection/models/converted-card';

@Component({
  selector: 'mco-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss']
})
export class CardImageComponent {
  @Input() convertedCard: ConvertedCard;
  loaded = false;
}
