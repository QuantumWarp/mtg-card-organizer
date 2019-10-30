import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { CardSetGridComponent } from '../../../card/grids/card-set/card-set-grid.component';
import { CardQuery } from '../../../card/models/card-query';
import { CardSet } from '../../../card/models/card-set';
import { AbstractGridComponent } from '../../../shared/grid/abstract-grid.component';
import { WrappedDataService } from '../../../shared/utils/wrapped-data-service';
import { CardInstanceGroupedCardSet } from '../../models/card-instance-grouped-card-set';

@Component({
  selector: 'mco-card-instance-grouped-card-set-grid',
  templateUrl: './card-instance-grouped-card-set-grid.component.html',
  styleUrls: ['./card-instance-grouped-card-set-grid.component.scss'],
})
export class CardInstanceGroupedCardSetGridComponent extends AbstractGridComponent implements OnChanges {
  @ViewChild(CardSetGridComponent) cardSetGrid: CardSetGridComponent;

  @Input() filter = new CardQuery();

  @Input() displayedColumns = ['count', 'name', 'setSymbol', 'manaCost', 'type', 'pt'];

  @Input() wrappedService: WrappedDataService<any, CardInstanceGroupedCardSet>;
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
