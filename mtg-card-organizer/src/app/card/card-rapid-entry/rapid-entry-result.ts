import { CardInstance } from '../models/card-instance';
import { CardSet } from '../models/card-set';

export class RapidEntryResult {
  entryText: string;
  selectedSetIds: number[];
  results: CardSet[];
  hasError: boolean;
  cardInstance: CardInstance;
}
