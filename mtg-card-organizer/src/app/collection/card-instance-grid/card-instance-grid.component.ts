import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { CardSetGridComponent } from '../../card/card-set-grid/card-set-grid.component';
import { CardInstance } from '../models/card-instance';
import { CardQuery } from '../../card/models/card-query';
import { CardSet } from '../../card/models/card-set';
import { AbstractGridComponent } from '../../shared/grid/abstract-grid.component.html';
import { WrappedDataService } from '../../shared/utils/wrapped-data-service';

@Component({
  selector: 'mco-card-instance-grid',
  templateUrl: './card-instance-grid.component.html',
  styleUrls: ['./card-instance-grid.component.scss']
})
export class CardInstanceGridComponent extends AbstractGridComponent implements OnChanges {
  @ViewChild(CardSetGridComponent) cardSetGrid: CardSetGridComponent;

  @Input() filter = new CardQuery();

  @Input() displayedColumns = ['name', 'setSymbol', 'manaCost', 'power', 'toughness', 'foil', 'promo'];

  @Input() wrappedService: WrappedDataService<any, CardInstance>;
  cardSetWrappedService: WrappedDataService<any, CardSet>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wrappedService']) {
      this.cardSetWrappedService = this.wrappedService.wrapMore(x => x.cardSet);
    }
  }
}
