import { Base64QueryStringGenerator } from '../utils/base64-query-string-generator';

export class Paging extends Base64QueryStringGenerator {
  offset = 0;
  limit?: number = null;

  constructor(init?: Partial<Paging>) {
    super('paging');
    Object.assign(this, init);
  }
}
