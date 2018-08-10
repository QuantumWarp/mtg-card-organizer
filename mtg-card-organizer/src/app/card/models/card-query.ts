import { Base64QueryStringGenerator } from '../../shared/utils/base64-query-string-generator';
import { Paging } from '../../shared/filtering/paging';
import { IPageable } from '../../shared/utils/apply-data-query.interface';

export class CardQuery extends Base64QueryStringGenerator implements IPageable {
  paging: Paging;

  name: string;
  text: string;
  setIds: number[];

  applyPaging(paging: Paging): void {
    this.paging = paging;
  }

  constructor(init?: Partial<CardQuery>) {
    super();
    Object.assign(this, init);
  }
}
