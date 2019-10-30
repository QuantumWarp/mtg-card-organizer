import { CardQuery } from '../models/card-query';

export class CardFilterData {
  currentFilter: CardQuery;

  canSelectCollection = true;
  collectionSearch = true;

  cardSetSearch = true;

  constructor(init?: Partial<CardFilterData>) {
    Object.assign(this, init);
  }
}
