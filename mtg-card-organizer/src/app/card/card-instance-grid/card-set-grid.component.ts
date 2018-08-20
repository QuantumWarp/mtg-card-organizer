import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

import { DataService } from '../../shared/utils/data-service.interface';
import { CardInstance } from '../models/card-instance';
import { CardQuery } from '../models/card-query';
import { Set } from '../models/set';
import { CardSetService } from '../services/card-set.service';
import { SetService } from '../services/set.service';
import { CardSet } from '../models/card-set';
import { CardGridComponent } from './card-grid.component';
import { Card } from '../models/card';
import { WrappedDataService } from '../../shared/utils/wrapped-data-service';
import { AbstractGridComponent } from '../../shared/grid/abstract-grid.component.html';

@Component({
  selector: 'app-card-set-grid',
  templateUrl: './card-set-grid.component.html',
  styleUrls: ['./card-grid.scss']
})
export class CardSetGridComponent extends AbstractGridComponent implements OnInit, OnChanges {
  @ViewChild(CardGridComponent) cardGrid: CardGridComponent;

  @Input() filter = new CardQuery();

  @Input() displayedColumns = ['name', 'setSymbol', 'manaCost'];

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
