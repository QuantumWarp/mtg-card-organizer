import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GetAllData } from '../../general/grid/grid-data-source.interfaces';
import { PageSortFilter } from '../../general/grid/page-sort-filter';
import { PagedData } from '../../general/grid/paged-data';
import { ApiService } from '../../general/communication/api.service';

@Injectable()
export class ImportService {

  constructor(private apiService: ApiService) { }

  import(importString: string): void {
    this.apiService.post<any>('api/admincard/import-cards', { importString: importString }).subscribe();
  }
}

