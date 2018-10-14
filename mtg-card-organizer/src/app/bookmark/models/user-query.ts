import { Paging } from '../../shared/filtering/paging';
import { Base64QueryStringGenerator } from '../../shared/utils/base64-query-string-generator';

export class UserQuery extends Base64QueryStringGenerator {
  paging: Paging;

  userName: string;

  constructor(init?: Partial<UserQuery>) {
    super('userQuery');
    Object.assign(this, init);
  }
}
