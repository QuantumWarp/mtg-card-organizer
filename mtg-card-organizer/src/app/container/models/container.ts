import { Collection } from '../../collection/models/collection';
import { Deck } from '../../deck/models/deck';

export class Container {
    id: number;

    name: string;
    parentId?: number;

    subContainers: Container[];
    collections: Collection[];
    decks: Deck[];

    public constructor(init?: Partial<Container>) {
      Object.assign(this, init);
    }
}
