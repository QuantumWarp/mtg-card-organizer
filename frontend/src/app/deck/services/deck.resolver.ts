import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Deck } from '../models/deck';
import { DeckService } from './deck.service';

@Injectable()
export class DeckResolver implements Resolve<Deck> {
  constructor(private deckService: DeckService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Deck> {
    return this.deckService.get(Number(route.paramMap.get('id')));
  }
}
