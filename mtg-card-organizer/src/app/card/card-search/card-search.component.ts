import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Card } from '../models/card';
import { Set } from '../models/set';
import { CardService, CardServiceInstanceWrapper } from '../services/card.service';
import { SetService } from '../services/set.service';
import { CardSet } from '../models/card-set';
import { CardInstance } from '../models/card-instance';
import { CardQuery } from '../models/card-query';
import { DataService } from '../../shared/utils/data-service.interface';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['../card.scss']
})
export class CardSearchComponent implements OnInit {
  @Output() cardInstanceSelected = new EventEmitter<CardInstance>();
  @Input() sets: Set[];
  @Input() filter = new CardQuery();

  @Input() displayedColumns = ['name', 'setSymbol', 'manaCost'];
  @Input() cardService: DataService<CardInstance>;

  constructor(
    public defaultCardService: CardService,
    private setService: SetService) {
    this.cardService = new CardServiceInstanceWrapper(defaultCardService);
  }

  ngOnInit(): void {
    this.setService.query().subscribe(results => this.sets = results.data);
  }
}
