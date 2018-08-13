import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Deck } from '../../deck/models/deck';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss']
})
export class DeckListComponent {
  @Input() decks: Deck[];

  constructor(private router: Router) { }

  itemSelected(deck: Deck): void {
    this.router.navigateByUrl('/decks/' + deck.id);
  }
}
