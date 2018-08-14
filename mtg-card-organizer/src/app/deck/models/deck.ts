export class Deck {
  id: number;
  name: string;
  containerId: number;

  constructor(init?: Partial<Deck>) {
    Object.assign(this, init);
  }
}
