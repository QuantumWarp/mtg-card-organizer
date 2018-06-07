import { Component, Input } from '@angular/core';
import { Card } from '../models/card';
import { trigger, transition, style, animate } from '@angular/animations';
import { fadeInAnimation } from '../../shared/animations/fade-in-animation';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.scss'],
  animations: [
    trigger('enterAnimation', [ transition(':enter', fadeInAnimation(2000)) ])
  ]
})
export class CardDetailsComponent {
  @Input() card: Card;
}
