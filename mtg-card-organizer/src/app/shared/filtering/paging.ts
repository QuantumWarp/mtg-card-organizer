export class Paging {
  offset = 0;
  limit?: number = null;

  constructor(init?: Partial<Paging>) {
    Object.assign(this, init);
  }
}
