import { Collection } from '../../collection/models/collection';
import { Deck } from '../../deck/models/deck';
import { Permission } from './permission';

export class Container {
  id: number;

  name: string;
  parentId?: number;
  isBookmarked: boolean;
  permission: Permission;

  subContainers: Container[];
  collections: Collection[];
  decks: Deck[];

  public constructor(init?: Partial<Container>) {
    Object.assign(this, init);
  }
}
