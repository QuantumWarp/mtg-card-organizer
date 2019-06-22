import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/communication/api.service';
import { Deck } from '../models/deck';
import { DeckCard } from '../models/deck-card';

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
    deck = new Deck(deck);
    deck.deckCards = deck.deckCards.map(x => new DeckCard(x));
    deck.deckCards.forEach(x => x.card = null);
    return this.apiService.patch<Deck>('api/decks', deck);
  }

  delete(deckId: number) {
    return this.apiService.delete<boolean>('api/decks/' + deckId);
  }
}
