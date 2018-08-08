import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Card } from '../models/card';
import { Set } from '../models/set';
import { CardService } from '../services/card.service';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['../card.scss']
})
export class CardSearchComponent implements OnInit {
  @Output() cardSelected = new EventEmitter<Card>();
  @Input() sets: Set[];

  @Input() displayedColumns = ['name', 'setSymbol', 'manaCost'];
  @Input() cardService: CardService;

  constructor(
    public defaultCardService: CardService,
    private setService: SetService) {
    this.cardService = defaultCardService;
  }

  ngOnInit(): void {
    this.setService.query().subscribe(results => this.sets = results.data);
  }
}
