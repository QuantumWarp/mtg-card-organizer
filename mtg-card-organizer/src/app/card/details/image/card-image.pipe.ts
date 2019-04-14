import { Pipe, PipeTransform } from '@angular/core';

import { CardSet } from '../../models/card-set';

@Pipe({name: 'toCardImageUrl'})
export class CardImagePipe implements PipeTransform {
  transform(cardSet: CardSet): string {
    const multiverseId = (cardSet && cardSet.multiverseId) ? cardSet.multiverseId : '0';
    return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${multiverseId}&type=card`;
  }
}
