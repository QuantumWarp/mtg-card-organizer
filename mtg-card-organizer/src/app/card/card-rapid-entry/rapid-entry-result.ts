import { Card } from '../models/card';
import { PropertyFilter } from '../../general/grid/property-filter';

export class RapidEntryResult {
  entryText: string;
  filter: PropertyFilter;
  results: Card[];
  hasError: boolean;
}
