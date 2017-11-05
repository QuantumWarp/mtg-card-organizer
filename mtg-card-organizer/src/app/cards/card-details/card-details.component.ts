import { Component, Input } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card-service/card.service';

@Component({
  selector: 'card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent {
  @Input() card: Card;

  constructor(private cardService: CardService) { }
}
