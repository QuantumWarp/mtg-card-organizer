import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { VersionModel } from '../models/version.model';

@Injectable()
export class VersionService {
  constructor(private apiService: ApiService) {}

  get(): Observable<VersionModel> {
    return this.apiService.get<VersionModel>('api/version');
  }
}
