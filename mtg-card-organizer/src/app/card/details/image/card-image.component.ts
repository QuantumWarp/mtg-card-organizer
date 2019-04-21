import { Component, Input } from '@angular/core';

import { CardSet } from '../../models/card-set';

@Component({
  selector: 'mco-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss']
})
export class CardImageComponent {
  @Input() cardSet: CardSet;
  loaded = false;
}