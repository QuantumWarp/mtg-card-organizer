import { QueryStringGenerator } from './query-string-generator.interface';

export class Base64QueryStringGenerator implements QueryStringGenerator {

  constructor(public paramName: string) { }

  toQueryString(): string {
    return this.paramName + '=' + btoa(JSON.stringify(this));
  }
}
