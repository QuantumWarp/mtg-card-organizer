import { CardSet } from './card-set';

export class CardInstance {
  id: number;

  foil = false;
  promo = false;

  cardSetId: number;
  cardSet: CardSet;

  imageUrl: string;

  public constructor(init?: Partial<CardInstance>) {
    Object.assign(this, init);
  }
}
