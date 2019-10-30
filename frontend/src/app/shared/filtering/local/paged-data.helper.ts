import { PagedData } from '../paged-data';
import { Paging } from '../paging';

export class PagedDataHelper {
  static createPagedData<T>(paging: Paging, data: T[]): PagedData<T> {
    const totalCount = data.length;
    let resultData = data;

    if (paging) {
      const startIndex = paging.offset;
      const endIndex = paging.limit || data.length - 1;
      resultData = data.slice(startIndex, endIndex);
    }

    const pagedData = new PagedData<T>();
    pagedData.data = resultData;
    pagedData.totalCount = totalCount;
    return pagedData;
  }
}
