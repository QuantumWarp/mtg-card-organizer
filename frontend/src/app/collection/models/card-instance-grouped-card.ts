import { Card } from '../../card/models/card';

export class CardInstanceGroupedCard {
  card: Card;
  count: number;

  public constructor(init?: Partial<CardInstanceGroupedCard>) {
    Object.assign(this, init);
  }
}
