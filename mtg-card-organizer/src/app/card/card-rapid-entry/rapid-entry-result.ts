import { PropertyFilter } from '../../general/filtering/property-filter';
import { Card } from '../models/card';
import { CardOtherInfo } from '../models/card-other-info';

export class RapidEntryResult {
  entryText: string;
  filters: PropertyFilter[];
  results: Card[];
  hasError: boolean;
  cardOtherInfo: CardOtherInfo;
}
