import { Component, Input, SimpleChanges } from '@angular/core';

import { Deck } from '../models/deck';
import { DataService } from '../../shared/utils/data-service.interface';
import { DeckCard } from '../models/deck-card';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { WrappedDataService } from '../../shared/utils/wrapped-data-service';
import { Card } from '../../card/models/card';

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.scss'],
})
export class MainGridComponent implements OnChanges {
  @Input() dataService: DataService<DeckCard>;
  wrappedService: WrappedDataService<DeckCard, Card>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataService']) {
      this.wrappedService = new WrappedDataService(this.dataService, x => x.card);
    }
  }
}
