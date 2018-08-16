import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

import { DataService } from '../../shared/utils/data-service.interface';
import { CardInstance } from '../models/card-instance';
import { CardQuery } from '../models/card-query';
import { Set } from '../models/set';
import { CardService, CardServiceInstanceWrapper } from '../services/card.service';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-card-instance-grid',
  templateUrl: './card-instance-grid.component.html',
  styleUrls: ['../card.scss']
})
export class CardInstanceGridComponent implements OnInit, OnChanges {
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log("test");

  }
}
