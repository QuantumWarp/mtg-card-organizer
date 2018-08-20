import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { AbstractGridComponent } from '../../shared/grid/abstract-grid.component.html';
import { BasicGridComponent } from '../../shared/grid/basic-grid/basic-grid.component';
import { DataService } from '../../shared/utils/data-service.interface';
import { Card } from '../models/card';
import { CardQuery } from '../models/card-query';
import { CardService } from '../services/card.service';
import { WrappedDataService } from '../../shared/utils/wrapped-data-service';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.scss']
})
export class CardGridComponent extends AbstractGridComponent {
  @ViewChild(BasicGridComponent) basicGrid: BasicGridComponent<Card>;

  @Input() filter = new CardQuery();
  @Input() displayedColumns = ['name', 'manaCost', 'power', 'toughness'];

  @Input() wrappedService: WrappedDataService<any, Card>;

  constructor(defaultCardService: CardService) {
    super();
    this.wrappedService = WrappedDataService.construct(defaultCardService);
  }
}
