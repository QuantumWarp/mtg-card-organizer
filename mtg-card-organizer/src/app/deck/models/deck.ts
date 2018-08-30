import { Card } from '../../card/models/card';
import { DeckCard } from './deck-card';

export class Deck {
  id: number;
  name: string;
  containerId: number;

  cards: DeckCard[];

  constructor(init?: Partial<Deck>) {
    Object.assign(this, init);
  }
}
