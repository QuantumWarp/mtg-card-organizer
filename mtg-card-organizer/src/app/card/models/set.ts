export class Set {
  id: string;
  name: string;

  public constructor(init?: Partial<Set>) {
    Object.assign(this, init);
  }
}
