import { Base64QueryStringGenerator } from '../../shared/utils/base64-query-string-generator';
import { Paging } from '../../shared/filtering/paging';
import { IPageable } from '../../shared/utils/apply-data-query.interface';
import { Rarity } from './rarity';
import { ManaCostQuery } from './mana-cost-query';

export class CardQuery extends Base64QueryStringGenerator implements IPageable {
  paging: Paging;

  collectionIds: number[];
  setIds: number[] = [];

  name: string[] = [];
  text: string[] = [];
  type: string[] = [];
  num: string[] = [];
  rarity: Rarity[] = [];

  manaCost = new ManaCostQuery();

  applyPaging(paging: Paging): void {
    this.paging = paging;
  }

  constructor(init?: Partial<CardQuery>) {
    super();
    Object.assign(this, init);
  }
}
