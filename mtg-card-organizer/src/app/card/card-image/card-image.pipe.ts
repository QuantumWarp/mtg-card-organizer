import { PipeTransform, Pipe } from '@angular/core';

import { Card } from '../models/card';

@Pipe({name: 'toCardImageUrl'})
export class CardImagePipe implements PipeTransform {
  transform(card: Card): string {
    const multiverseId = (card && card.multiverseId) ? card.multiverseId : '0';
    return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${multiverseId}&type=card`;
  }
}
