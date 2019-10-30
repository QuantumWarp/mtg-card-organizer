import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

import { CardQuery } from '../../../card/models/card-query';
import { WrappedDataService } from '../../../shared/utils/wrapped-data-service';
import { Card } from '../../../card/models/card';
import { CardSet } from '../../../card/models/card-set';
import { CardInstanceGroupedCardSet } from '../../models/card-instance-grouped-card-set';
import { AbstractGridComponent } from '../../../shared/grid/abstract-grid.component';
import { CardService } from '../../../card/services/card.service';
import { CardSetService } from '../../../card/services/card-set.service';
import { CollectionGroupedByCardServiceWrapper, CollectionGroupedByCardSetServiceWrapper, CollectionInstanceServiceWrapper } from '../../services/collection-card-query.service';
import { CardInstanceGroupedCard } from '../../models/card-instance-grouped-card';
import { CardInstance } from '../../models/card-instance';
import { CardGridComponent } from '../../../card/grids/card/card-grid.component';
import { CardSetGridComponent } from '../../../card/grids/card-set/card-set-grid.component';
import { CardInstanceGroupedCardGridComponent } from '../card-instance-grouped-card-grid/card-instance-grouped-card-grid.component';
import { CardInstanceGroupedCardSetGridComponent } from '../card-instance-grouped-card-set-grid/card-instance-grouped-card-set-grid.component';
import { CardInstanceGridComponent } from '../card-instance-grid/card-instance-grid.component';
import { ConvertedCard } from '../../models/converted-card';

type GridMode = 'card' | 'cardSet' | 'groupedCard' | 'groupedCardSet' | 'cardInstance';

@Component({
  selector: 'mco-variable-grid',
  templateUrl: './variable-grid.component.html',
  styleUrls: ['./variable-grid.component.scss'],
})
export class VariableGridComponent extends AbstractGridComponent implements OnInit {
  @ViewChild(CardGridComponent) cardGrid: CardGridComponent;
  @ViewChild(CardSetGridComponent) cardSetGrid: CardSetGridComponent;
  @ViewChild(CardInstanceGroupedCardGridComponent) groupedCardGrid: CardInstanceGroupedCardGridComponent;
  @ViewChild(CardInstanceGroupedCardSetGridComponent) groupedCardSetGrid: CardInstanceGroupedCardSetGridComponent;
  @ViewChild(CardInstanceGridComponent) cardInstanceGrid: CardInstanceGridComponent;

  @Output() rowSelected = new EventEmitter<ConvertedCard>();

  @Input() filter: CardQuery;
  @Input() extraColumns = [];
  @Input() displayedColumns: string[];

  cardWrappedService: WrappedDataService<any, Card>;
  cardSetWrappedService: WrappedDataService<any, CardSet>;
  groupedCardWrappedService: WrappedDataService<any, CardInstanceGroupedCard>;
  groupedCardSetWrappedService: WrappedDataService<any, CardInstanceGroupedCardSet>;
  cardInstanceWrappedService: WrappedDataService<any, CardInstance>;

  get gridMode(): GridMode {
    if (this.filter.collectionIds.length === 0 && this.filter.groupByCard) {
      return 'card';
    } else if (this.filter.collectionIds.length === 0 && this.filter.groupByCardSet) {
      return 'cardSet';
    } else if (this.filter.collectionIds.length > 0 && this.filter.groupByCard) {
      return 'groupedCard';
    } else if (this.filter.collectionIds.length > 0 && this.filter.groupByCardSet) {
      return 'groupedCardSet';
    } else if (this.filter.collectionIds.length > 0 && !this.filter.groupByCard && !this.filter.groupByCardSet) {
      return 'cardInstance';
    }
  }

  constructor(
    private cardService: CardService,
    private cardSetService: CardSetService,
    private collectionGroupedByCardServiceWrapper: CollectionGroupedByCardServiceWrapper,
    private collectionGroupedByCardSetServiceWrapper: CollectionGroupedByCardSetServiceWrapper,
    private collectionInstanceServiceWrapper: CollectionInstanceServiceWrapper,
  ) {
    super();
  }

  ngOnInit(): void {
    this.cardWrappedService = WrappedDataService.construct(this.cardService);
    this.cardSetWrappedService = WrappedDataService.construct(this.cardSetService);
    this.groupedCardWrappedService = WrappedDataService.construct(this.collectionGroupedByCardServiceWrapper);
    this.groupedCardSetWrappedService = WrappedDataService.construct(this.collectionGroupedByCardSetServiceWrapper);
    this.cardInstanceWrappedService = WrappedDataService.construct(this.collectionInstanceServiceWrapper);
  }

  filteredDisplayedColumns(allowedColumns: string[]): string[] {
    const filteredColumns = allowedColumns.filter(x => this.displayedColumns.includes(x));
    allowedColumns.length = 0;
    allowedColumns.push(...filteredColumns, ...this.extraColumns);
    return allowedColumns;
  }

  convert(record: Card | CardSet | CardInstanceGroupedCard | CardInstanceGroupedCardSet | CardInstance): ConvertedCard {
    switch (this.gridMode) {
      case 'card':
        return {
          card: record as Card,
        };
      case 'cardSet':
        return {
          card: (record as CardSet).card,
          cardSet: record as CardSet
        };
      case 'cardInstance':
        return {
          card: (record as CardInstance).cardSet.card,
          cardSet: (record as CardInstance).cardSet,
          cardInstance: record as CardInstance,
        };
      case 'groupedCard':
        return {
          card: (record as CardInstanceGroupedCard).card,
          count: (record as CardInstanceGroupedCard).count,
        };
      case 'groupedCardSet':
        return {
          card: (record as CardInstanceGroupedCardSet).cardSet.card,
          cardSet: (record as CardInstanceGroupedCardSet).cardSet,
          count: (record as CardInstanceGroupedCardSet).count,
        };
    }
  }

  refreshDataSource(): void {
    switch (this.gridMode) {
      case 'card':
        return this.cardGrid.refreshDataSource();
      case 'cardSet':
        return this.cardSetGrid.refreshDataSource();
      case 'cardInstance':
        return this.cardInstanceGrid.refreshDataSource();
      case 'groupedCard':
        return this.groupedCardGrid.refreshDataSource();
      case 'groupedCardSet':
        return this.groupedCardSetGrid.refreshDataSource();
    }
  }
}
