import { PropertyFilter } from '../../general/filtering/property-filter';
import { Card } from '../models/card';
import { CardOtherInfo } from '../models/card-other-info';

export class RapidEntryResult {
  entryText: string;
  selectedSetIds: number[];
  results: Card[];
  hasError: boolean;
  cardOtherInfo: CardOtherInfo;
}
