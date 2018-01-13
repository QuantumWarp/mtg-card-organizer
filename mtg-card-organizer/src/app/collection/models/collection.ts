import { Card } from '../../card/models/card';

export class Collection {
    id: number;
    name: string;
    parentId?: number;
    hasSubCollections: boolean;
    hasCards: boolean;

    // Not populated by collection query.
    subCollections?: Collection[];
    cards?: Card[];
}
