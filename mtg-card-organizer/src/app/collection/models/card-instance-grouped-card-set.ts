import { CardSet } from '../../card/models/card-set';

export class CardInstanceGroupedCardSet {
  cardSet: CardSet;
  count: number;

  public constructor(init?: Partial<CardInstanceGroupedCardSet>) {
    Object.assign(this, init);
  }
}
