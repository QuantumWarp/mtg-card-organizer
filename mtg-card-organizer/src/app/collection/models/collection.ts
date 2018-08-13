import { Card } from '../../card/models/card';

export class Collection {
    id: number;
    name: string;
    containerId: number;

    public constructor(init?: Partial<Collection>) {
      Object.assign(this, init);
    }
}
