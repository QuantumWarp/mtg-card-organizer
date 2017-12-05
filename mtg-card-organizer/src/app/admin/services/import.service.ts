import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GetAllData } from '../../general/grid/grid-data-source.interfaces';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { PagedData } from '../../general/grid/paged-data';

@Injectable()
export class ImportService {

  constructor(private httpClient: HttpClient) { }

  import(importString: string): Observable<void> {
    return this.httpClient.post<void>('http://localhost/api/admin/import-cards', importString);
  }
}

