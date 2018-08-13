import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Container } from '../models/container';
import { ContainerService } from './container.service';


@Injectable()
export class ContainerResolver implements Resolve<Container> {
  constructor(private containerService: ContainerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Container> {
    return this.containerService.get(Number(route.paramMap.get('id')));
  }
}
