import { Color } from './color';

export class ManaCostQuery {
  exclusive = false;
  onlyMulticolor = false;
  color: Color[] = [];

  constructor(init?: Partial<ManaCostQuery>) {
    Object.assign(this, init);
  }
}
