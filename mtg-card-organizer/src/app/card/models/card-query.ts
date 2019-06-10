import { Base64QueryStringGenerator } from '../../shared/utils/base64-query-string-generator';
import { Paging } from '../../shared/filtering/paging';
import { IPageable } from '../../shared/utils/apply-data-query.interface';
import { Rarity } from './rarity';
import { ManaCostQuery } from './mana-cost-query';

export class CardQuery extends Base64QueryStringGenerator implements IPageable {
  paging: Paging;

  name: string[] = [];
  text: string[] = [];
  type: string[] = [];
  manaCost = new ManaCostQuery();

  setIds: number[] = [];
  rarities: Rarity[] = [];
  nums: string[] = [];

  groupByCard = false;
  collectionIds: number[];

  constructor(init?: Partial<CardQuery>) {
    super('cardQuery');
    Object.assign(this, init);
  }

  applyPaging(paging: Paging): void {
    this.paging = paging;
  }

  isCollectionSearch(): boolean {
    return this.collectionIds.length !== 0;
  }
}
