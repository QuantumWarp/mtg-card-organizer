import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Container } from '../models/container';
import { ContainerService } from './container.service';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { catchError } from 'rxjs/internal/operators';

@Injectable()
export class ContainerResolver implements Resolve<Container> {

  constructor(
    private containerService: ContainerService,
    private authenticationService: AuthenticationService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Container> {
    let value = Number(route.paramMap.get('id'));
    value = value ? value : Number(this.authenticationService.baseContainerId);
    return this.containerService.get(value).pipe(
      catchError((_err, caught) => {
        this.authenticationService.logout();
        return caught;
      }),
    );
  }
}
