import { Component, Input, ViewChild } from '@angular/core';

import { AbstractGridComponent } from '../../../shared/grid/abstract-grid.component';
import { BasicGridComponent } from '../../../shared/grid/basic-grid/basic-grid.component';
import { WrappedDataService } from '../../../shared/utils/wrapped-data-service';
import { Card } from '../../models/card';
import { CardQuery } from '../../models/card-query';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'mco-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.scss']
})
export class CardGridComponent extends AbstractGridComponent {
  @ViewChild(BasicGridComponent) basicGrid: BasicGridComponent<Card>;

  @Input() filter = new CardQuery();
  @Input() displayedColumns = ['name', 'manaCost', 'type', 'pt'];

  @Input() wrappedService: WrappedDataService<any, Card>;

  constructor(defaultCardService: CardService) {
    super();
    this.wrappedService = WrappedDataService.construct(defaultCardService);
  }

  refreshDataSource(): void {
    this.basicGrid.refreshDataSource();
  }
}
