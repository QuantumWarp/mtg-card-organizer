import { CardInstance } from '../models/card-instance';
import { CardSet } from '../../card/models/card-set';

export class RapidEntryResult {
  entryText: string;
  results: CardSet[];
  totalCount: number;
  cardInstance: CardInstance;

  constructor(init?: Partial<RapidEntryResult>) {
    Object.assign(this, init);
  }
}
