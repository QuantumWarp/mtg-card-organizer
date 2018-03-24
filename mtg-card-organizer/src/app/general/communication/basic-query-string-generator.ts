import { QueryStringGenerator } from './query-string-generator.interface';

export class BasicQueryStringGenerator implements QueryStringGenerator {
  constructor(private dict: {[id: string]: string; }) {}

  toQueryString(): string {
    let result = '';
    for (const key in this.dict) {
      if (this.dict.hasOwnProperty(key)) {
        result = result + key + '=' + this.dict[key];
      }
    }
    return result;
  }
}
