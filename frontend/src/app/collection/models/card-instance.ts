import { CardSet } from '../../card/models/card-set';

export class CardInstance {
  id: number;

  foil = false;
  promo = false;

  cardSetId: number;
  cardSet: CardSet;

  public constructor(init?: Partial<CardInstance>) {
    Object.assign(this, init);
  }
}
