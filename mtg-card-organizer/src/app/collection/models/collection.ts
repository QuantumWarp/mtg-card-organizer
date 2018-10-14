export class Collection {
    id: number;
    name: string;
    containerId: number;
    isBookmarked: boolean;

    public constructor(init?: Partial<Collection>) {
      Object.assign(this, init);
    }
}
