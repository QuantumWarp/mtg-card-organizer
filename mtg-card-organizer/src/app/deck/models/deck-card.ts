import { Card } from '../../card/models/card';
import { DeckPart } from './deck-part';

export class DeckCard {
  card: Card;
  deckPart: DeckPart;
  count: number;

  constructor(init?: Partial<DeckCard>) {
    Object.assign(this, init);
  }
}
