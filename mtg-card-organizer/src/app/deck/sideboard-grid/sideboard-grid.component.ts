import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

import { Card } from '../../card/models/card';
import { DataService } from '../../shared/grid/grid-data-source.interfaces';
import { WrappedDataService } from '../../shared/utils/wrapped-data-service';
import { DeckCard } from '../models/deck-card';

@Component({
  selector: 'mco-sideboard-grid',
  templateUrl: './sideboard-grid.component.html',
  styleUrls: ['./sideboard-grid.component.scss'],
})
export class SideboardGridComponent implements OnChanges {
  @Output() toMain = new EventEmitter<DeckCard>();
  @Output() remove = new EventEmitter<DeckCard>();
  @Output() rowSelected = new EventEmitter<Card>();

  @Input() mode: 'view' | 'edit';
  @Input() sideboardCount: number;
  @Input() dataService: DataService<DeckCard>;
  wrappedService: WrappedDataService<DeckCard, Card>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataService']) {
      this.wrappedService = new WrappedDataService(this.dataService, x => x.card);
    }
  }
}
