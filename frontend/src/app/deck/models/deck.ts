import { DeckCard } from './deck-card';

export class Deck {
  id: number;
  name: string;
  containerId: number;

  deckCards: DeckCard[];

  constructor(init?: Partial<Deck>) {
    Object.assign(this, init);
  }
}
