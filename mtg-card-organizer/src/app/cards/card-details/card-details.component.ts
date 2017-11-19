import { Component, Input } from '@angular/core';
import { Card } from '../card';
import { trigger, transition, style, animate } from '@angular/animations';
import { fadeInAnimation } from '../../animations/fade-in-animation';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  animations: [
    trigger('enterAnimation', [ transition(':enter', fadeInAnimation(2000)) ])
  ]
})
export class CardDetailsComponent {
  @Input() card: Card;
}
