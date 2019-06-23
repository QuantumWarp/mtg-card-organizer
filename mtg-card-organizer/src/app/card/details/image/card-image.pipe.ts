import { Pipe, PipeTransform } from '@angular/core';

import { ConvertedCard } from '../../../collection/models/converted-card';

@Pipe({name: 'toCardImageUrl'})
export class CardImagePipe implements PipeTransform {
  transform(convertedCard: ConvertedCard): string {
    if (convertedCard.cardSet && convertedCard.cardSet.multiverseId) {
      return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${convertedCard.cardSet.multiverseId}&type=card`;
    } else if (convertedCard.card && convertedCard.card.name) {
      return `http://gatherer.wizards.com/Handlers/Image.ashx?name=${encodeURIComponent(convertedCard.card.name)}&type=card`;
    } else {
      return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card`;
    }
  }
}
