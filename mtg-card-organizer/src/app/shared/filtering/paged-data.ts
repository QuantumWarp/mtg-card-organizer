export class PagedData<T> {
  data: T[];
  totalCount: number;

  constructor(init?: Partial<PagedData<T>>) {
    Object.assign(this, init);
  }
}
