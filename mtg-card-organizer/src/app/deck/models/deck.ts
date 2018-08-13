export class Deck {
  id: number;
  name: string;
  parentId: number;

  constructor(init?: Partial<Deck>) {
    Object.assign(this, init);
  }
}
