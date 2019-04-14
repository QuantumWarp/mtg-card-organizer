import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { Deck } from '../models/deck';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private apiService: ApiService) { }

  get(deckId: number): Observable<Deck> {
    return this.apiService.get<Deck>('api/decks/' + deckId);
  }

  create(deckName: string, containerId: number): Observable<Deck> {
    return this.apiService.post<Deck>('api/decks', new Deck({ name: deckName, containerId: containerId }));
  }

  update(deck: Deck): Observable<Deck> {
    return this.apiService.patch<Deck>('api/decks', deck);
  }

  delete(deckId: number) {
    return this.apiService.delete<boolean>('api/decks/' + deckId);
  }
}
