import { QueryStringGenerator } from './query-string-generator.interface';

export class Base64QueryStringGenerator implements QueryStringGenerator {
  toQueryString(): string {
    return 'cardQuery=' + btoa(JSON.stringify(this));
  }
}
