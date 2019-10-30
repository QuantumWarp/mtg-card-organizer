export class Set {
  id: number;
  name: string;
  code: string;
  releaseDate: Date;

  public constructor(init?: Partial<Set>) {
    Object.assign(this, init);
  }
}
