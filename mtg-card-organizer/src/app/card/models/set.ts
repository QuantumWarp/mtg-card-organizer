export class Set {
  id: number;
  name: string;

  public constructor(init?: Partial<Set>) {
    Object.assign(this, init);
  }
}
