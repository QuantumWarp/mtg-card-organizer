import { PropertyFilter } from '../../general/filtering/property-filter';
import { Card } from '../models/card';

export class RapidEntryResult {
  entryText: string;
  filters: PropertyFilter[];
  results: Card[];
  hasError: boolean;
}
