import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

import { Card } from '../../card/models/card';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { WrappedDataService } from '../../shared/utils/wrapped-data-service';
import { DeckCard } from '../models/deck-card';
import { ConvertedCard } from '../../collection/models/converted-card';

@Component({
  selector: 'mco-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.scss'],
})
export class MainGridComponent implements OnChanges {
  @Output() toSideboard = new EventEmitter<DeckCard>();
  @Output() remove = new EventEmitter<DeckCard>();
  @Output() rowSelected = new EventEmitter<ConvertedCard>();

  @Input() mode: 'view' | 'edit';
  @Input() mainDeckCount: number;
  @Input() dataService: DataService<DeckCard>;
  wrappedService: WrappedDataService<DeckCard, Card>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataService) {
      this.wrappedService = new WrappedDataService(this.dataService, x => x.card);
    }
  }
}
