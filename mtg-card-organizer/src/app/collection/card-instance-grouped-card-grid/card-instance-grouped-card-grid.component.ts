import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { CardGridComponent } from '../../card/grids/card/card-grid.component';
import { Card } from '../../card/models/card';
import { CardQuery } from '../../card/models/card-query';
import { AbstractGridComponent } from '../../shared/grid/abstract-grid.component';
import { WrappedDataService } from '../../shared/utils/wrapped-data-service';
import { CardInstanceGroupedCard } from '../models/card-instance-grouped-card';

@Component({
  selector: 'mco-card-instance-grouped-card-grid',
  templateUrl: './card-instance-grouped-card-grid.component.html',
  styleUrls: ['./card-instance-grouped-card-grid.component.scss'],
})
export class CardInstanceGroupedCardGridComponent extends AbstractGridComponent implements OnChanges {
  @ViewChild(CardGridComponent) cardGrid: CardGridComponent;

  @Input() filter = new CardQuery();

  @Input() displayedColumns = ['count', 'name', 'manaCost', 'type', 'pt'];

  @Input() wrappedService: WrappedDataService<any, CardInstanceGroupedCard>;
  cardWrappedService: WrappedDataService<any, Card>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wrappedService']) {
      this.cardWrappedService = this.wrappedService.wrapMore(x => x.card);
    }
  }
}
