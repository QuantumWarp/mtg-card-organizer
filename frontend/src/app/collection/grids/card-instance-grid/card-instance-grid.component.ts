import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { CardSetGridComponent } from '../../../card/grids/card-set/card-set-grid.component';
import { CardInstance } from '../../models/card-instance';
import { CardQuery } from '../../../card/models/card-query';
import { CardSet } from '../../../card/models/card-set';
import { AbstractGridComponent } from '../../../shared/grid/abstract-grid.component';
import { WrappedDataService } from '../../../shared/utils/wrapped-data-service';

@Component({
  selector: 'mco-card-instance-grid',
  templateUrl: './card-instance-grid.component.html',
  styleUrls: ['./card-instance-grid.component.scss'],
})
export class CardInstanceGridComponent extends AbstractGridComponent implements OnChanges {
  @ViewChild(CardSetGridComponent) cardSetGrid: CardSetGridComponent;

  @Input() filter = new CardQuery();

  @Input() displayedColumns = ['name', 'setSymbol', 'manaCost', 'pt', 'foil', 'promo'];

  @Input() wrappedService: WrappedDataService<any, CardInstance>;
  cardSetWrappedService: WrappedDataService<any, CardSet>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wrappedService']) {
      this.cardSetWrappedService = this.wrappedService.wrapMore(x => x.cardSet);
    }
  }

  refreshDataSource(): void {
    this.cardSetGrid.refreshDataSource();
  }
}
