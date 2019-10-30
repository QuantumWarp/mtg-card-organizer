import { Paging } from '../filtering/paging';
import { MatSort } from '@angular/material';

export const isPageable = (obj: any): obj is IPageable => Boolean(obj && obj['applyPaging']);
export interface IPageable {
  applyPaging(paging: Paging): void;
}

export const isSortable = (obj: any): obj is ISortable => Boolean(obj && obj['applySorting']);
export interface ISortable {
  applySorting(sort: MatSort): void;
}
