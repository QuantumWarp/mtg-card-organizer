import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { AbstractGridComponent } from '../../shared/grid/abstract-grid.component.html';
import { WrappedDataService } from '../../shared/utils/wrapped-data-service';
import { CardGridComponent } from '../card-grid/card-grid.component';
import { Card } from '../models/card';
import { CardQuery } from '../models/card-query';
import { CardSet } from '../models/card-set';
import { Set } from '../models/set';
import { CardSetService } from '../services/card-set.service';
import { SetService } from '../services/set.service';

@Component({
  selector: 'mco-card-set-grid',
  templateUrl: './card-set-grid.component.html',
  styleUrls: ['./card-set-grid.component.scss']
})
export class CardSetGridComponent extends AbstractGridComponent implements OnInit, OnChanges {
  @ViewChild(CardGridComponent) cardGrid: CardGridComponent;

  @Input() filter = new CardQuery();

  @Input() displayedColumns = ['name', 'setSymbol', 'manaCost', 'power', 'toughness'];

  @Input() wrappedService: WrappedDataService<any, CardSet>;
  cardWrappedService: WrappedDataService<any, Card>;

  sets: Set[];

  constructor(
    defaultCardSetService: CardSetService,
    private setService: SetService) {
    super();
    this.wrappedService = WrappedDataService.construct(defaultCardSetService);
    this.cardWrappedService = this.wrappedService.wrapMore(x => x.card);
  }

  ngOnInit(): void {
    this.setService.query().subscribe(results => this.sets = results.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wrappedService']) {
      this.cardWrappedService = this.wrappedService.wrapMore(x => x.card);
    }
  }
}
