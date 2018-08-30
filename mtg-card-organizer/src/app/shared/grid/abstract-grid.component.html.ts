import { ContentChild, ContentChildren, Input, QueryList, Output, EventEmitter } from '@angular/core';
import { MatColumnDef, MatSort } from '@angular/material';

export class AbstractGridComponent {
  @Output() rowSelected = new EventEmitter<any>();

  @ContentChildren(MatColumnDef) contentColumnDefs: QueryList<MatColumnDef>;
  @Input() inputColumnDefs: QueryList<MatColumnDef>;

  private _queryList = new QueryList<MatColumnDef>();

  get columnDefs(): QueryList<MatColumnDef> {
    const list = new Array<MatColumnDef>();
    if (this.inputColumnDefs) { list.push(...this.inputColumnDefs.toArray()); }
    if (this.contentColumnDefs) { list.push(...this.contentColumnDefs.toArray()); }

    const currentList = this._queryList.toArray();
    if (!this.arraysEqual(currentList, list)) {
      const queryList = new QueryList<MatColumnDef>();
      queryList.reset(list);
      this._queryList = queryList;
    }

    return this._queryList;
  }

  @ContentChild(MatSort) contentMatSort: MatSort;
  @Input() inputMatSort: MatSort;

  get matSort(): MatSort {
    return this.inputMatSort ? this.inputMatSort : this.contentMatSort;
  }

  private arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i]) {
          return false;
        }
    }

    return true;
}
}
