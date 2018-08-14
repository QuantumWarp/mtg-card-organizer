import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';

@Injectable()
export class ImportService {

  constructor(private apiService: ApiService) { }

  import(importString: string): Observable<void> {
    return this.apiService.post<any>('api/admin/import-cards', { importString: importString });
  }
}

