import { Card } from '../../card/models/card';

export class Collection {
    id: number;
    subCollections: Collection[];
    cards: Card[];
}