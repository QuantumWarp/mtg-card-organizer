import { transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

import { fadeInAnimation } from '../../shared/animations/fade-in-animation';
import { CardSet } from '../models/card-set';

@Component({
  selector: 'mco-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
  animations: [
    trigger('enterAnimation', [ transition(':enter', fadeInAnimation(2000)) ])
  ]
})
export class CardDetailsComponent {
  @Input() cardSet: CardSet;
}
