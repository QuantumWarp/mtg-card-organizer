import { ContentChild, ContentChildren, Input, QueryList } from '@angular/core';
import { MatColumnDef, MatSort } from '@angular/material';

export class AbstractGridComponent<T> {
  @ContentChildren(MatColumnDef) contentColumnDefs: QueryList<MatColumnDef>;
  @Input() inputColumnDefs: QueryList<MatColumnDef>;

  get columnDefs(): QueryList<MatColumnDef> {
    const list = new Array<MatColumnDef>();
    if (this.inputColumnDefs) { list.push(...this.inputColumnDefs.toArray()); }
    if (this.contentColumnDefs) { list.push(...this.contentColumnDefs.toArray()); }
    const queryList = new QueryList<MatColumnDef>();
    queryList.reset(list);
    return queryList;
  }

  @ContentChild(MatSort) contentMatSort: MatSort;
  @Input() inputMatSort: MatSort;

  get matSort(): MatSort {
    return this.inputMatSort ? this.inputMatSort : this.contentMatSort;
  }
}
