import { Card } from '../../card/models/card';
import { CardSet } from '../../card/models/card-set';
import { CardInstance } from './card-instance';

export interface ConvertedCard {
  card: Card;
  cardSet?: CardSet;
  cardInstance?: CardInstance;
  count?: number;
}
