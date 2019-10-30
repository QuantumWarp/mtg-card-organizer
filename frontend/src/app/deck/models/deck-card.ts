import { Card } from '../../card/models/card';
import { DeckPart } from './deck-part';

export class DeckCard {
  cardId: number;
  card: Card;
  part: DeckPart;
  count: number;

  constructor(init?: Partial<DeckCard>) {
    Object.assign(this, init);
  }
}
