import { Rarity } from './rarity';
import { Card } from './card';

export class CardSet {
  id: number;

  num: string;
  setId: number;
  rarity: Rarity;
  artist: string;
  multiverseId: string;

  cardId: number;
  card: Card;

  public constructor(init?: Partial<CardSet>) {
    Object.assign(this, init);
  }
}
