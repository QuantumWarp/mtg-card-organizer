import { Card } from '../../card/models/card';

export class Collection {
    id: number;
    name: string;
    parentId?: number;
    hasSubCollections: boolean;
    hasCards: boolean;

    public constructor(init?: Partial<Collection>) {
      Object.assign(this, init);
    }

    // Not populated by collection query.
    subCollections?: Collection[];
    cards?: Card[];
}
