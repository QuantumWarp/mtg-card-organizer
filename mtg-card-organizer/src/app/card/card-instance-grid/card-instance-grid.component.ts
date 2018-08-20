import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { AbstractGridComponent } from '../../shared/grid/abstract-grid.component.html';
import { DataService } from '../../shared/utils/data-service.interface';
import { WrappedDataService } from '../../shared/utils/wrapped-data-service';
import { CardInstance } from '../models/card-instance';
import { CardQuery } from '../models/card-query';
import { CardSet } from '../models/card-set';
import { CardSetGridComponent } from './card-set-grid.component';

@Component({
  selector: 'app-card-instance-grid',
  templateUrl: './card-instance-grid.component.html',
  styleUrls: ['../card.scss']
})
export class CardInstanceGridComponent extends AbstractGridComponent implements OnChanges {
  @ViewChild(CardSetGridComponent) cardSetGrid: CardSetGridComponent;

  @Input() filter = new CardQuery();

  @Input() displayedColumns = ['name', 'setSymbol', 'manaCost'];

  @Input() wrappedService: WrappedDataService<any, CardInstance>;
  cardSetWrappedService: WrappedDataService<any, CardSet>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wrappedService']) {
      this.cardSetWrappedService = this.wrappedService.wrapMore(x => x.cardSet);
    }
  }
}
